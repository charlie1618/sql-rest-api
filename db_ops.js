const mysql = require('mysql2/promise');
const config = require('./db_config');

async function getStudents() {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        const [rows, fields] = await connection.execute("SELECT * FROM Details");
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        if (connection) connection.end();
    }
}

async function getStudent(studentId) {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        const [rows, fields] = await connection.execute("SELECT * FROM Details WHERE Id = ?", [studentId]);
        return rows[0];
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        if (connection) connection.end();
    }
}

async function addStudent(student) {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        const [result] = await connection.execute("CALL InsertStudents(?, ?, ?, ?)", [
            student.Id, 
            student.Name, 
            student.Age, 
            student.City
        ]);

        return result;
    } catch (err) {
        console.log(err);
        return null;
    } finally {
        if (connection) connection.end();
    }
}

module.exports = {
    getStudents: getStudents,
    getStudent: getStudent,
    addStudent: addStudent
};
