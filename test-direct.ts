import pg from 'pg';
import 'dotenv/config';

const { Client } = pg;

async function testConnection() {
  // Try direct connection first
  const connectionString = "postgresql://postgres:Cm2iiP8ZCjEM8HBY@db.lcquojthhdrnfbvlgwmi.supabase.co:5432/postgres";
  console.log('Testing connection to:', connectionString);
  const client = new Client({
    connectionString: connectionString,
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
