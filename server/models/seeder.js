import pool from './connection.db';
import Utils from '../helpers/utils'

const seed = async () => {
    try{
        const pwd = 'admin123';
        let hashPwd = Utils.hashPassword(pwd);
        let query = `INSERT INTO users (first_name, last_name, email, password, phone_number, address, is_admin) VALUES ('chris', 'admin', 'admin@mail.com', '${hashPwd}', '0786756493', 'kigali', true)`;
        const insert = await pool.query(query);
        return insert;
    }catch(error){
        console.log(error);
    }
}
seed();

export default seed;
