/// src/lib/get-user-server-side.tsx
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
export async function getUser(ctx: GetServerSidePropsContext) {
  const token = ctx.req.cookies.token as string;
  if (token) {
    const userToken = await new Promise((resolve, reject) => {
      jwt.verify(
        token.substring(1, token.length - 1),
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
    return {
      props: {
        user: userToken,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
