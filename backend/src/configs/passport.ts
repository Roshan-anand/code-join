import passport from "passport";
import dotenv from "dotenv";
import { Strategy as GitHubStrategy } from "passport-github";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";

dotenv.config();

passport.serializeUser((user: any, done) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done) => {
  done(null, obj);
});

// google OAuth Atrategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.BACKEND_URL + "/auth/callback/google",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        name: profile.displayName,
        email: profile.emails ? profile.emails[0].value : null,
        pic: profile.photos ? profile.photos[0].value : null,
      };
      return done(null, user);
    }
  )
);

// GitHub OAuth Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: process.env.BACKEND_URL + "/auth/callback/github",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        name: profile.displayName || profile.username,
        email: profile.emails ? profile.emails[0].value : null,
        pic: profile.photos ? profile.photos[0].value : null,
      };
      return done(null, user);
    }
  )
);

// local OAuth strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "email",
      passReqToCallback: true,
    },
    (req, name, email, done) => {
      const user = {
        name: name,
        email: email,
        pic: null,
      };
      return done(null, user);
    }
  )
);

export default passport;
