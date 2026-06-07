import pg from 'pg';

const { Client } = pg;

async function testLocal() {
  const connectionString = "postgresql://postgres:Cm2iiP8ZCjEM8HBY@localhost:5432/postgres";
  console.log('Testing connection to:', connectionString);
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    await client.connect();
    console.log('Connected successfully to local Postgres');
    const res = await client.query('SELECT NOW()');
    console.log('Query result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testLocal();
