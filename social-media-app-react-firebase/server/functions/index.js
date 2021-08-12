const functions = require("firebase-functions");
const {
  getAllScreams,
  createScream,
  getScream,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
} = require("./handlers/screams");
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  markNotificationsRead,
  getUserDetails,
} = require("./handlers/users");
const { FBAuth } = require("./utils/FBAuth");
const { firebaseConfig } = require("./utils/config");

const app = require("express")();

const firebase = require("firebase");
const { db } = require("./utils/admin");
firebase.initializeApp(firebaseConfig);

// screams routes
app.get("/screams", getAllScreams);
app.post("/createScream", FBAuth, createScream);
app.get("/scream/:screamId", getScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);
app.post("/scream/:screamId/comment", FBAuth, commentOnScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);

// users routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/user/notification", FBAuth, markNotificationsRead);

exports.api = functions.region("europe-west1").https.onRequest(app);

exports.createNotificationOnLike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "like",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.deleteNotificationOnUnlike = functions
  .region("europe-west1")
  .firestore.document("likes/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`notifications/${snapshot.id}`)
      .delete()
      .catch((err) => console.error(err));
  });

exports.createNotificationOnComment = functions
  .region("europe-west1")
  .firestore.document("comments/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(`screams/${snapshot.data().screamId}`)
      .get()
      .then((doc) => {
        if (
          doc.exists &&
          doc.data().userHandle !== snapshot.data().userHandle
        ) {
          return db.doc(`notifications/${snapshot.id}`).set({
            createdAt: new Date().toISOString(),
            recipient: doc.data().userHandle,
            sender: snapshot.data().userHandle,
            type: "comment",
            read: false,
            screamId: doc.id,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

exports.onUserImageChange = functions
  .region("europe-west1")
  .firestore.document("users/{userId}")
  .onUpdate((change) => {
    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      let batch = db.batch();
      return db
        .collection(`screams`)
        .where("userHandle", "==", change.before.data().handle)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const scream = db.doc(`screams/${doc.id}`);
            const comment = db
              .collection(`comments`)
              .where("screamId", "==", doc.id)
              .get()[0];

            batch.update(scream, { userImage: change.after.data().imageUrl });
            // batch.update(comment, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        })
        .then(() => {});
    } else {
      return true;
    }
  });

exports.onScreamDeleted = functions
  .region("europe-west1")
  .firestore.document("screams/{screamId}")
  .onDelete((snapshot, context) => {
    const screamId = context.params.screamId;
    const batch = db.batch();

    return db
      .collection("comments")
      .where("screamId", "==", screamId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`comments/${doc.id}`));
        });

        return db
          .collection("likes")
          .where("screamId", "==", screamId)
          .get()
          .then((data) => {
            data.forEach((doc) => {
              batch.delete(db.doc(`likes/${doc.id}`));
            });

            return db
              .collection("notifications")
              .where("screamId", "==", screamId)
              .get()
              .then((data) => {
                data.forEach((doc) => {
                  batch.delete(db.doc(`notifications/${doc.id}`));
                });

                return batch.commit();
              });
          });
      })
      .catch((err) => console.error(err));
  });
