import express from "express";
const usersRouter = express.Router();
export default usersRouter;

import { createUser, getUserByUsernameAndPassword } from "#db/queries/users";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";

usersRouter.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  }
);

usersRouter.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByUsernameAndPassword(username, password);
    if (!user) return res.status(400).send("Invalid usernme or password.");
    const token = createToken({ id: user.id });
    res.send(token);
  }
);
