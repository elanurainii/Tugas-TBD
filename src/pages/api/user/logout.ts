import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handlerLogout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;
  switch (req.method) {
    case "POST":
      try {
        if (token) {
          res.setHeader("Set-Cookie", [
            serialize("token", "", {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              sameSite: true,
              maxAge: 5,
              path: "/",
            }),
          ]);
          res.status(200).json({ message: "Logged out successfully." });
          res.end();
        }
      } catch (err) {
        console.log(err);
      }
  }
}
