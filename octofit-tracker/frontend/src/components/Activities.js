import React, { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return `https://${codespace}-8000.app.github.dev/api/${endpoint}/`;
};

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const url = getApiUrl('activities');
    console.log('Fetching Activities from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities data:', data);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, []);
  // Try to infer columns from first activity
  const columns = activities.length > 0 ? Object.keys(activities[0]) : [];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Activities</h2>
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
                {activities.map((a, i) => (
                  <tr key={a.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{a[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {activities.length === 0 && <div className="text-muted">No activities available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
