import { Router } from "express";
import passport from "passport";
const router = Router();

//Github authentication routes
router.get("/github", passport.authenticate("github"));

router.get(
  "/callback/github",
  passport.authenticate("github", {
    failureRedirect: `${process.env.FRONTEND_URL}/`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/home/dashboard`);
  }
);

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
