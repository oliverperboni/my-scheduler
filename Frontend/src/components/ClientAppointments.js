import React, { useState, useEffect } from 'react';

const ClientAppointments = ({ clientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`/api/clients/${clientId}/appointments/`);
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        setAppointments(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [clientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Appointments of Client {clientId}</h2>
      {appointments.length === 0 ? (
        <p>No appointments found for this client.</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              {appointment.date} - {appointment.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientAppointments;
