import { conn } from "../configs/db.js";
import md5 from "md5";

export default async function Create(req, res) {
  const { name, email, password } = req.body;
  const passCrypted = md5(password);

  const user = await conn('USERS').insert({
    NAME: name,
    EMAIL: email,
    PASSWORD: passCrypted
  })

  return res.status(201).send(
    {
      mensagem: {
        "name": name,
        "email": email,
      }
    }
  )
}

export async function ListAll(req, res) {
  const user = await conn('USERS').select('NAME', 'EMAIL')

  return res.status(201).send(user)
}