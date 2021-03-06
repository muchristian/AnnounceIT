import {Pool} from 'pg';

const config = {
	username:'postgres',
	password:'chris32',
	database:'announceit',
	host: '127.0.0.1',
    port: 5432,
};

const conf = new Pool({
	user: config.username,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
});

const url  = new Pool({
  connectionString: process.env.DATABASE_URL
});
let pool =  url || conf;

pool.on('error', (error) =>{
console.log(error);
});


export default pool;

