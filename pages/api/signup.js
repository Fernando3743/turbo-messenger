import client from '../../postgres/db.js';

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Handle signup logic here
    const { id_cliente, login, password, direccion, email, telefono } = req.body;

    // Check if the email already exists
    const checkQuery = `
      SELECT id_cliente FROM usuario WHERE email = $1
    `;
    const checkValues = [email];
    client.query(checkQuery, checkValues)
      .then(result => {
        if (result.rows.length > 0) {
          // Email already exists, return a 409 Conflict status
          res.status(409).json({ error: 'Email already exists!' });
        } else {
          // Email is unique, proceed with signup
          const insertQuery = `
            INSERT INTO usuario (id_cliente, login, contrasena, direccion, email, telefono)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
          `;
          const insertValues = [id_cliente, login, password, direccion, email, telefono];
          return client.query(insertQuery, insertValues);
        }
      })
      .then(() => {
        // Signup successful
        res.status(201).json({ message: 'Signup successful!' });
      })
      .catch(error => {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}