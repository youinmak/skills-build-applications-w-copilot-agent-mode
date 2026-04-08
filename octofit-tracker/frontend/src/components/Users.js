import React, { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return `https://${codespace}-8000.app.github.dev/api/${endpoint}/`;
};

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = getApiUrl('users');
    console.log('Fetching Users from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);
  // Try to infer columns from first user
  const columns = users.length > 0 ? Object.keys(users[0]) : [];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Users</h2>
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  {columns.map((col) => (
                    <th key={col} scope="col">{col.charAt(0).toUpperCase() + col.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{u[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div className="text-muted">No users available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
