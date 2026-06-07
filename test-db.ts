import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
  });

  try {
    await client.connect();
    console.log('Connected successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
