const { db } = require("../utils/admin");

exports.getAllScreams = (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          ...doc.data(),
        });
      });

      return res.json(screams);
    })
    .catch((err) => console.error(err));
};

exports.createScream = (req, res) => {
  const { body } = req.body;
  if (body.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newScream = {
    body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0,
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      return res.json(resScream);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "something goes wrong" });
    });
};

exports.getScream = (req, res) => {
  let screamData = {};
  const { screamId } = req.params;

  return db
    .doc(`/screams/${screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;

      return db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .where("screamId", "==", screamId)
        .get();
    })
    .then((data) => {
      screamData.comments = [];
      if (data.empty) {
        return res.json(screamData);
      }
      data.forEach((doc) => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.commentOnScream = (req, res) => {
  if (req.body.body.trim() === "") {
    return res.status(400).json({ comment: "Must not be empty" });
  }

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl,
  };

  db.doc(`screams/${req.params.screamId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection("comments").add(newComment);
    })
    .then(() => {
      return res.status(200).json(newComment);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.likeScream = (req, res) => {
  const likeDoc = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDoc = db.doc(`screams/${req.params.screamId}`);

  let screamData = {};

  screamDoc
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }

      screamData = doc.data();
      screamData.screamId = doc.id;

      return likeDoc.get();
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("likes")
          .add({
            screamId: req.params.screamId,
            userHandle: req.user.handle,
          })
          .then(() => {
            screamData.likeCount++;

            return screamDoc.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          });
      } else {
        return res.status(400).json({ error: "scream already liked" });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.unlikeScream = (req, res) => {
  const likeDoc = db
    .collection("likes")
    .where("userHandle", "==", req.user.handle)
    .where("screamId", "==", req.params.screamId)
    .limit(1);

  const screamDoc = db.doc(`screams/${req.params.screamId}`);

  let screamData = {};

  screamDoc
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }

      screamData = doc.data();
      screamData.screamId = doc.id;

      return likeDoc.get();
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "scream not liked" });
      }

      return db
        .doc(`likes/${data.docs[0].id}`)
        .delete()
        .then(() => {
          screamData.likeCount--;

          return screamDoc.update({ likeCount: screamData.likeCount });
        })
        .then(() => {
          return res.json(screamData);
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteScream = (req, res) => {
  const document = db.doc(`screams/${req.params.screamId}`);

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Scream not found" });
      }

      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      return document.delete();
    })
    .then(() => {
      return res.status(200).json({ messgae: "Scream deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
