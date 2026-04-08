import React, { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return `https://${codespace}-8000.app.github.dev/api/${endpoint}/`;
};

const Teams = () => {
  const [teams, setTeams] = useState([]);
  useEffect(() => {
    const url = getApiUrl('teams');
    console.log('Fetching Teams from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams data:', data);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, []);
  // Try to infer columns from first team
  const columns = teams.length > 0 ? Object.keys(teams[0]) : [];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Teams</h2>
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
                {teams.map((t, i) => (
                  <tr key={t.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{t[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {teams.length === 0 && <div className="text-muted">No teams available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
