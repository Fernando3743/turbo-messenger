import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  secret: "sfsakfbaskjfbka",
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        console.log("Credentials: ", credentials);
        // Replace this with your own logic to validate the credentials
        if (credentials.email === 'user@example.com' && credentials.password === 'password') {
          return { id: 1, name: 'John Doe', email: 'user@example.com' };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
});
