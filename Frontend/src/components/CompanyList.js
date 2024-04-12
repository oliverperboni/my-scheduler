import React, { useState, useEffect } from 'react';

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch('http://localhost:8000/my_scheduler_api/companies/'); // Adjust the URL according to your API endpoint
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  return (
    <div>
      <h1>Company List</h1>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <a href={`/appointment_company/${company.id}`}>{company.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
