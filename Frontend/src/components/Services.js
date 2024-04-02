import React, { useState, useEffect } from "react";
import axios from "axios";

const Services = (props) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/my_scheduler_api/services"
        );
        setServices(response.data); // Assuming the API response is an array of service objects
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    name: "aula de ingles",
    duration: 70,
    price: 45,
  });

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:8000/my_scheduler_api/services", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

  const formatDuration = (durationInMinutes) => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div>
      <h2>Services</h2>
      <ul>
        {services.map((service) => (
          <li key={service.id}>
            <button onClick={() => props.setService(service.id)}>
              <strong>Name:</strong> {service.name}
              <br />
              <strong>Duration:</strong> {formatDuration(service.duration)}
              <br />
              <strong>Price:</strong> ${service.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
