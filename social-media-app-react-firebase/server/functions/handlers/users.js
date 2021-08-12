const { db, admin } = require("../utils/admin");
const firebase = require("firebase");
const { firebaseConfig } = require("../utils/config");
const { isEmpty, isEmail, reduceUserDetails } = require("../utils/validation");

exports.signup = (req, res) => {
  const { email, password, confirmPassword, handle } = req.body;

  const newUser = {
    handle,
    email,
    password,
  };

  let errors = {};

  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) errors.email = "Must be a valid email";

  if (isEmpty(password)) errors.password = "Must not be empty";
  if (isEmpty(confirmPassword)) {
    errors.confirmPassword = "Must not be empty";
  } else if (password !== confirmPassword)
    errors.confirmPassword = "Password must match";

  if (isEmpty(handle)) errors.handle = "Must not be empty";

  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let token, userId;

  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ handle: "this username is already token" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
          .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
          })
          .then((idToken) => {
            token = idToken;
            const userCredentials = {
              ...newUser,
              createdAt: new Date().toISOString(),
              userId,
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/no-image.jpg?alt=media`,
            };

            db.doc(`/users/${handle}`)
              .set(userCredentials)
              .then(() => {
                return res.status(201).json({ token });
              });
          })
          .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
              return res.status(400).json({ email: "Email is already in use" });
            }
            return res
              .status(500)
              .json({ general: "Something went wrong, please try again" });
          });
      }
    });
};

// log user in
exports.login = (req, res) => {
  const { email, password } = req.body;

  let errors = {};

  if (isEmpty(email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(email)) errors.email = "Must be a valid email";

  if (isEmpty(password)) errors.password = "Must not be empty";

  if (Object.keys(errors).length > 0) res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(403).json({ general: "Wrong credentials, please try again" });
    });
};

// add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.handle}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details added successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};

  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("likes")
          .where("userHandle", "==", req.user.handle)
          .get();
      }
    })
    .then((data) => {
      userData.likes = [];
      data.forEach((doc) => {
        userData.likes.push(doc.data());
      });
      return db
        .collection("notifications")
        .where("recipient", "==", req.user.handle)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          ...doc.data(),
          notificationId: doc.id,
        });
      });
      return res.status(200).json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.json({ error: err.code });
    });
};

// upload a profil image for user
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (feiledName, file, fileName, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "wrong file type submitted" });
    }
    const imageExtension = fileName.split(".")[fileName.split(".").length - 1];

    imageFileName = `${Math.round(
      Math.random() * 100000000000
    )}.${imageExtension}`;

    const filePath = path.join(os.tmpdir(), imageFileName);

    imageToBeUploaded = { filePath, mimetype };

    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media`;

        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        res.json({ messgae: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: err.code });
      });
  });

  busboy.end(req.rawBody);
};

exports.getUserDetails = (req, res) => {
  let userData = {};

  db.doc(`users/${req.params.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection("screams")
          .where("userHandle", "==", req.params.handle)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    })
    .then((data) => {
      userData.screams = [];
      data.forEach((doc) => {
        userData.screams.push({
          ...doc.data(),
          screamId: doc.id,
        });
      });

      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ error: err.code });
    });
};

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.notificationIds.forEach((notificationId) => {
    const notification = db.doc(`notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });
  batch
    .commit()
    .then(() => {
      return res.json({ message: "Notification marked read" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
