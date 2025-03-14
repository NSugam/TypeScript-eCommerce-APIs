import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '123',
  port: 5432,
});

pool.query('SELECT NOW()', (err:any,res:any) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Connected to PostgreSQL on', res.rows[0].now);
  }
});

pool.query('SELECT * from userTable', (err:any,res:any) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Query Result:\n', res.rows[0]);
  }
});
