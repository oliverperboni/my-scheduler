import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = (props) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/service');
        setServices(response.data); // Assuming the API response is an array of service objects
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <button onClick={()=> props.setService(service.id)}>
            <strong>Name:</strong> {service.name}<br />
            <strong>Duration:</strong> {formatDuration(service.duration)}<br />
            <strong>Price:</strong> ${service.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
