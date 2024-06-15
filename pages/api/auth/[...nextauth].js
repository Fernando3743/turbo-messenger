import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import client from '../../../postgres/db';

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
        // Validate the credentials against your database
        const { email, password } = credentials;

        try {
          const query = `
            SELECT id_usuario, login, email
            FROM usuario
            WHERE email = $1 AND contrasena = $2
          `;
          const result = await client.query(query, [email, password]);

          if (result.rows.length > 0) {
            // If credentials are valid, return user data
            const { id_usuario, login, email } = result.rows[0];
            return { id: id_usuario, login, email };
          } else {
            // If credentials are invalid, return null
            console.error('credentials are invalid')
            return null;
          }
        } catch (error) {
          // Handle errors (e.g., database connection error)
          console.error('Error validating credentials:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Include user information in the JWT token
      if (user) {
        token.id = user.id;
        token.login = user.login;
      }
      return token;
    },
    async session({ session, token }) {
      // Include user information in the session
      if (token) {
        session.user.id = token.id;
        session.user.login = token.login;
      }
      return session;
    },
  },
});