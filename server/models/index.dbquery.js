import pool from './connection.db';
class Model {
    constructor(table){
        this.table = table;
        this.pool = pool;
    }

    async insert(cols, selector, value) {
        const query = `INSERT INTO ${this.table}(${cols}) VALUES(${selector}) returning *`;
        try{
            const res = await this.pool.query(query, value);
            return res;

        }catch(err){
            throw err;
        }
    }
    async selectAll(){
        const query = `SELECT * FROM ${this.table}`;
        try{
            const res = await this.pool.query(query);
            return res;
        }catch(err){
            throw err;
        }
    }
    async selectByCol(cols){
        const query = `SELECT ${cols} FROM ${this.table}`;
        try{
            const res = await this.pool.query(query);
            return res;
        }catch(err){
            throw err;
        }
    }
    async selectByColWhere(cols, selector, value){
        const query = `SELECT ${cols} FROM ${this.table} WHERE ${selector}`;
        try{
            const res = await this.pool.query(query, value);
            return res;
        }catch(err){
            throw err;
        }
    }

    async selectByColWhereAnd(cols, selector1, selector2, value){
        const query = `SELECT ${cols} FROM ${this.table} WHERE ${selector1} AND ${selector2}`;
        try{
            const res = await this.pool.query(query, value);
            return res;
        }catch(err){
            throw err;
        }
    }

    async update(cols, selector, value){
        const query = `UPDATE ${this.table} SET ${cols} WHERE ${selector} returning *`;
        try{
            const res = await this.pool.query(query, value);
            return res;
        }catch(err){
            throw err;
        }
    }

    async updateAnd(cols, selector1, selector2, value){
        const query = `UPDATE ${this.table} SET ${cols} WHERE ${selector1} AND ${selector2} returning *`;
        try{
            const res = await this.pool.query(query, value);
            return res;
        }catch(err){
            throw err;
        }
    }

    async delete(selector, value){
        const query = `DELETE FROM ${this.table} WHERE ${selector} returning *`;
        try{
            const res = await this.pool.query(query, value);
            return res;
        }catch(err){
            throw err;
        }
    }

    async truncate(){
        const query = `TRUNCATE TABLE ${this.table} RESTART IDENTITY CASCADE`;
        try{
            const res = await this.pool.query(query);
            return res;
        }catch(err){
            throw err;
        }
    }


}

export default Model;