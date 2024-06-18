import client from '../../../postgres/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const queryText = 'SELECT * FROM estado_servicio WHERE codigo_servicio = $1 ORDER BY fecha_hora;';
      const values = [id];
      const result = await client.query(queryText, values);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving data from estado_servicio table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
