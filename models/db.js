import mysql from 'mysql'
import dbConfig  from '../config/config.js'

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

export default connection

