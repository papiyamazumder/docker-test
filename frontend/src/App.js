import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = 'http://backend:5000';
 
console.log("Hello")
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users', err);
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      await axios.post(`${apiUrl}/users`, user);
      fetchUsers(); // Refresh user list after adding a new user
    } catch (err) {
      console.error('Error adding user', err);
      setError('Failed to add user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Management</h1>
      <UserForm addUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
