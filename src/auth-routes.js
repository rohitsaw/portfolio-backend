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
    const origin = req.header("origin");
    console.log("origin", origin);
    res.redirect(process.env.CLIENT_ADDRESS1);
  });
});

app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_ADDRESS1,
    failureRedirect: "/login/failed",
  })
);

export default app;
