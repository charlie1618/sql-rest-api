const mysql = require('mysql2/promise');
const config = require('./db_config');

/**
 * Retrieves all students from the 'Details' table.
 * @returns {Array<Object>} An array of student objects.
 */
async function getStudents() {
    let connection;
    try {
        // Create a connection to the MySQL database
        connection = await mysql.createConnection(config);
        
        // Use connection.execute for queries with placeholders to prevent SQL injection.
        // For a simple SELECT *, query() or execute() works fine.
        const [rows, fields] = await connection.execute("SELECT * FROM Details");
        
        return rows;
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        if (connection) connection.end();
    }
}

/**
 * Retrieves a single student by their ID.
 * @param {number} studentId The ID of the student to retrieve.
 * @returns {Object} The student object, or null if not found.
 */
async function getStudent(studentId) {
    let connection;
    try {
        connection = await mysql.createConnection(config);
        
        // Use execute() with '?' placeholders for parameterized queries.
        // The values are passed in an array as the second argument.
        const [rows, fields] = await connection.execute("SELECT * FROM Details WHERE Id = ?", [studentId]);

        return rows[0]; // Return the first row, or undefined if no results
    } catch (error) {
        console.log(error);
        return null;
    } finally {
        if (connection) connection.end();
    }
}

/**
 * Adds a new student by calling a stored procedure.
 * @param {Object} student The student object to add.
 * @returns {Array<Object>} The result of the stored procedure execution.
 */
async function addStudent(student) {
    let connection;
    try {
        connection = await mysql.createConnection(config);

        // Call the 'InsertStudents' stored procedure with the student data.
        // The '?' placeholders will be replaced by the values in the array.
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
