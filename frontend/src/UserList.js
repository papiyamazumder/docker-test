import React from 'react';

function UserList({ users }) {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.designation} - {user.email} - {user.age}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
