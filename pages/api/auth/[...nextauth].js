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
            SELECT id_cliente, login, email
            FROM usuario
            WHERE email = $1 AND contrasena = $2
          `;
          const result = await client.query(query, [email, password]);

          if (result.rows.length > 0) {
            // If credentials are valid, return user data
            const { id_cliente, name } = result.rows[0];
            return { id: id_cliente, name, email };
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
});
