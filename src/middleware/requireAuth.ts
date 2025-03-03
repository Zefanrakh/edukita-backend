import "../config/passport";
import passport from "passport";

/**
 * Middleware to authenticate users using JWT.
 *
 * - Uses Passport's JWT strategy for authentication.
 * - Disables session-based authentication (`session: false`).
 * - Returns an error response instead of redirecting (`failWithError: true`).
 *
 * @example
 * app.get("/protected-route", requireAuth, (req, res) => {
 *   res.json({ message: "You have access!" });
 * });
 *
 * @type {import("express").RequestHandler}
 */
export const requireAuth = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});
