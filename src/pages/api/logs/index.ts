import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default function LogsHandler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token as string;
  switch (req.method) {
    case "GET":
      try {
        jwt.verify(
          token.substring(1, token.length - 1),
          process.env.TOKEN_SECRET as string,
          {},
          async (err, token) => {
            if (err) {
              throw err;
            } else {
              const rows = await prisma.aUDIT_MK.findMany();
              res.status(200).json({ rows });
            }
          }
        );
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      }
  }
}
