const mysql = require('mysql');
const util = require('util');

const debug_console = require('debug')('MySQL');

// https://www.quora.com/How-do-I-use-a-MySQL-pool-in-multiple-files-with-Node-js


// The following variables are being validated at the INDEX file
const HOST = process.env.MYSQL_HOST;
const PORT = process.env.MYSQL_PORT;
const USERNAME = process.env.MYSQL_USER_1;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DATABASE;

console.log(HOST);

async function mySqlSingleConnection(sql, data) {

    /**
     * Single MySQL connection.
     * Creates the connection, makes the query and close it to avoid concurrency conflicts.
     */

    try {

        console.log('Opening connection...')
        var connection = mysql.createConnection({
            host: HOST,
            port: PORT,
            user: USERNAME,
            password: PASSWORD,
            database: DATABASE
        });

        const query = util.promisify(connection.query).bind(connection);

        const rows = await query(sql, data);
        // console.log(rows)
        // console.log(JSON.stringify(rows));

        /* 
            Se transforma la data para eviar los objetos RowDataPacket
            [
                RowDataPacket { } 
            ]
        */
       return rows;
        // return JSON.parse(JSON.stringify(rows));

    } catch (error) {
        console.log(error);
        throw new Error(error);
    } finally {
        console.log('Closing connection...');
        connection.end();
    }


    /**
     * Example of use:
     * 
     *     
        router.get('/db', async (req, res) => {
            console.log('database single connection');

            try {
                
                let rows = await db('SELECT * from articulos');
                //console.log(rows);
                res.send(rows);

            } catch (error) {
                //console.log(error);
                res.send(error.message);
            }

        });

     */

};

module.exports.db = mySqlSingleConnection;