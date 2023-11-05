import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function MkHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;
  const token = req.cookies.token as string;

  switch (req.method) {
    case "GET":
      try {
        if (token) {
          jwt.verify(
            token.substring(1, token.length - 1),
            process.env.TOKEN_SECRET as string,
            {},
            async (err, token) => {
              if (err) {
                throw err;
              } else {
                const rows = await prisma.mATA_KULIAH.findFirst({
                  where: {
                    ID_MK: slug,
                  },
                });
                return res.status(200).json({ rows });
              }
            }
          );
        } else {
          res.status(500).json({ message: "There is no token" });
        }
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "PUT":
      try {
        const { id, mataKuliah, slug } = req.body;
        console.log(req.body);
        jwt.verify(
          token.substring(1, token.length - 1),
          process.env.TOKEN_SECRET as string,
          {},
          async (err, token) => {
            if (err) {
              throw err;
            } else {
              const rows = await prisma.mATA_KULIAH.update({
                where: {
                  ID_MK: slug,
                },
                data: {
                  ID_MK: id,
                  NAME_MK: mataKuliah,
                },
              });
              return res.status(200).json({ rows });
            }
          }
        );
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "There is no token" });
      }
  }
}
