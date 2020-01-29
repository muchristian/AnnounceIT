import pool from './connection.db';

const createTables = async () => {
    const userQuery = `CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(30) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                phone_number varchar(50) NOT NULL,
                address varchar(30) NOT NULL,
                is_admin boolean DEFAULT false
            )`;
                
    const announcementQuery = `CREATE TABLE IF NOT EXISTS announcement(
              id SERIAL PRIMARY KEY,
              owner INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
              status varchar(50) DEFAULT 'pending',
              text varchar(255) NOT NULL,
              start_date DATE DEFAULT CURRENT_DATE,
              end_date DATE DEFAULT CURRENT_DATE + integer '7'
        )`;

        try{
            const result = await pool.query(`${userQuery}; ${announcementQuery}`);
            console.log(`${result} created`);
        }catch(error){
            console.log(`${error} not created`);
        }
        
        
    }

    createTables();
    export default createTables;




