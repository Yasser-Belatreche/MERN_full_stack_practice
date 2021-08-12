const { admin, db } = require("./admin");

exports.FBAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        req.user = decodedToken;

        return db
          .collection("users")
          .where("userId", "==", req.user.uid)
          .limit(1)
          .get();
      })
      .then((data) => {
        req.user.handle = data.docs[0].data().handle;
        req.user.imageUrl = data.docs[0].data().imageUrl;
        next();
      })
      .catch((err) => {
        console.error("Error while verifying token ", err);
        return res.status(403).json(err);
      });
  } else {
    console.error("No token found");
    res.status(403).json({ error: "Unauthorized" });
  }
};
