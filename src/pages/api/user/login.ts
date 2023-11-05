import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

export default async function handleRegister(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  switch (req.method) {
    case "POST":
      try {
        const findUser = await prisma.users.findFirst({
          where: { username: username },
        });
        if (findUser) {
          const checkPass = await bcrypt.compare(password, findUser.password);
          if (checkPass) {
            try {
              const token = await new Promise((resolve, reject) => {
                jwt.sign(
                  { username, id: findUser.id },
                  process.env.TOKEN_SECRET as string,
                  {},
                  (err, token) => {
                    if (err) {
                      reject(err);
                    }
                    resolve(token);
                  }
                );
              });
              const serializedData = serialize("token", JSON.stringify(token), {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
              });
              res.setHeader("Set-Cookie", serializedData);
              res.status(200).json({ token });
            } catch (err) {
              console.log(err);
            }
          } else {
            res.status(401).json({ message: "Password is incorrect" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (err) {
        console.log(err);
      }
      break;
    case "GET":
      try {
        const token = req.cookies.token as string;
        if (token) {
          jwt.verify(
            token.substring(1, token.length - 1),
            process.env.TOKEN_SECRET as string,
            {},
            (err, token) => {
              if (err) {
                res.status(400).json({ message: "Credential not found" });
              } else {
                res.json(token);
              }
            }
          );
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (err) {
        console.log(err);
      }
  }
}