import client from '../../../postgres/db'; // Replace with your PostgreSQL database connection logic

export default async function handler(req, res) {
  const { id } = req.query;

  const client_id = parseInt(id);

  if (req.method === 'DELETE') {
    try {
      const deleteClientQuery = `
        DELETE FROM cliente
        WHERE id = $1
      `;

      const { rowCount } = await client.query(deleteClientQuery, [client_id]);

      if (rowCount === 0) {
        return res.status(404).json({ success: false, error: 'Client not found' });
      }

      res.status(200).json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
      console.error('Error deleting client:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).json({ success: false, error: `Method ${method} not allowed` });
  }
}
