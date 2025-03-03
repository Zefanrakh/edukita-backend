import "../config/passport";
import passport from "passport";

export const requireAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});
