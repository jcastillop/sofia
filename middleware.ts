import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith("/api")) {
        return true;
      }

      if (token) return true;
      //console.log(pathname)

      return false;
    },
  },  
  pages: {
    signIn: "/auth",
  },
});