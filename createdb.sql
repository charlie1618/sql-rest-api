-- Create the Students database
CREATE DATABASE Students;

-- Use the newly created database
USE Students;

-- Create the Details table
CREATE TABLE Details (
    Id INT PRIMARY KEY,
    Name VARCHAR(255),
    Age INT,
    City VARCHAR(255)
);

-- Insert some sample data into the Details table
INSERT INTO Details (Id, Name, Age, City) VALUES
    (1, 'John Doe', 21, 'New York'),
    (2, 'Jane Smith', 22, 'Los Angeles'),
    (3, 'Peter Jones', 23, 'Chicago'),
    (4, 'Mary Brown', 20, 'Houston');
