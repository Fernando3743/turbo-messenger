import {Client} from 'pg';

const connectionData = {
  user: 'postgres',
  host: '192.168.1.7',
  database: 'turbo_messenger',
  password: 'postgres',
  port: '5432'
}

const client = new Client(connectionData);

client.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Connection error', err.stack));

export default client;