import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function handleForm(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.token as string;
  const { id, mataKuliah } = req.body;
  switch (req.method) {
    case "POST":
      try {
        if (token) {
          jwt.verify(
            token.substring(1, token.length - 1),
            process.env.TOKEN_SECRET as string,
            {},
            async (err, token) => {
              if (err) {
                res.status(400).json({ message: "Wrong token" });
              } else {
                const matkulexist = await prisma.mATA_KULIAH.findFirst({
                  where: {
                    ID_MK: id,
                  },
                });
                if (matkulexist) {
                  res
                    .status(400)
                    .json({ message: "Matkul sudah permah dibuat" });
                } else {
                  const matkul = await prisma.mATA_KULIAH.create({
                    data: {
                      ID_MK: id,
                      NAME_MK: mataKuliah,
                    },
                  });
                  return res.status(200).json({ matkul });
                }
              }
            }
          );
        } else {
          res.status(400).json({ message: "No token" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "GET":
      try {
        if (token) {
          jwt.verify(
            token.substring(1, token.length - 1),
            process.env.TOKEN_SECRET as string,
            {},
            async (err, token) => {
              if (err) {
                console.log(err);
              } else {
                const rows = await prisma.mATA_KULIAH.findMany();
                res.status(200).json({ rows });
              }
            }
          );
        } else {
          res.status(400).json({ message: "no token" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" });
      }
      break;
  }
}
