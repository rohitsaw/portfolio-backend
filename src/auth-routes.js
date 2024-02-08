import express from "express";
import passport from "passport";

const app = express.Router();

app.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
    });
  }
});

app.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    if (req.headers.referer?.includes("onrender")) {
      res.redirect(process.env.CLIENT_ADDRESS1);
    } else {
      res.redirect(process.env.CLIENT_ADDRESS2);
    }
  });
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get("/google/callback", function (req, res, next) {
  console.log("referrer", req.headers.referer);
  passport.authenticate("google", {
    successRedirect: req.headers.referer?.includes("onrender")
      ? process.env.CLIENT_ADDRESS1
      : process.env.CLIENT_ADDRESS1,
    failureRedirect: "/login/failed",
  })(req, res, next);
});

export default app;
