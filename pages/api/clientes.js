import client from '../../postgres/db.js';

export default async function handler(req, res) {
  try {
    const result = await client.query('SELECT * FROM cliente');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}