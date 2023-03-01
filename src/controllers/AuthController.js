import { conn } from "../configs/db.js";
import GenerateJWT from "../utils/jwt.js";
import md5 from "md5";

export default async function Auth(req, res) {
  const { name, password } = req.body;
  const user = await conn('USERS')
    .where('NAME', name)
    .select()
    .first()
  if (!user) {
    return response.status(404).send({ error: "User not found" })
  }
  else if (md5(password) !== user.PASSWORD) {
    return res.status(401).send({ error: "Password Incorrect" })
  }

  const token = await GenerateJWT({ id: user.ID })

  await res.send({
    user: user.ID,
    token: token
  })

}