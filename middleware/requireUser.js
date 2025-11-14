/** Requires a logged-in user */
export default async function requireUser(req, res, next) {
  console.log("requireUser path:", req.path, "user:", req.user);
  if (!req.user) return res.status(401).send("Unauthorized");
  next();
}
