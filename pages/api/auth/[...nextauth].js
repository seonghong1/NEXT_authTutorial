import NextAuth from "next-auth/next";
import Provider from "next-auth/providers";

export default NextAuth({
  provider: [
    Provider.Credentials({
      async authorize(credentials) {},
      conne,
    }),
  ],
});
