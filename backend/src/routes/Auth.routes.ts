import { Router } from "express";
import passport from "passport";
const router = Router();

// github authentication routes
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

// google authentication routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback/google",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/`,
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/home/dashboard`);
  }
);

// local authentication routes
router.post("/local", (req, res, next) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) {
      console.log("Authentication error:", err);
      return res.status(500).json({ error: "Authentication failed" });
    }

    if (!user) {
      console.log("Authentication failed:", info);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log("Login error:", err);
        return res.status(500).json({ error: "Login failed" });
      }
      res.json({
        message: "Authentication successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          provider: user.provider,
        },
        sessionId: req.sessionID,
      });
    });
  })(req, res, next);
});

router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
