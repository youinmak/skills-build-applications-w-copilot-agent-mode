
import React, { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return `https://${codespace}-8000.app.github.dev/api/${endpoint}/`;
};

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    const url = getApiUrl('leaderboard');
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  // Try to infer columns from first leader
  const columns = leaders.length > 0 ? Object.keys(leaders[0]) : [];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Leaderboard</h2>
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
                {leaders.map((l, i) => (
                  <tr key={l.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{l[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {leaders.length === 0 && <div className="text-muted">No leaderboard data available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
