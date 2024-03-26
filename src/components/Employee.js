import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/employee');
        setEmployees(response.data); // Assuming the API response is an array of employee objects
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Employee;