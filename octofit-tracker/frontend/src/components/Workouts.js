import React, { useEffect, useState } from 'react';

const getApiUrl = (endpoint) => {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  return `https://${codespace}-8000.app.github.dev/api/${endpoint}/`;
};

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  useEffect(() => {
    const url = getApiUrl('workouts');
    console.log('Fetching Workouts from:', url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts data:', data);
      })
      .catch(err => console.error('Error fetching workouts:', err));
  }, []);
  // Try to infer columns from first workout
  const columns = workouts.length > 0 ? Object.keys(workouts[0]) : [];

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="card-title mb-4 text-primary">Workouts</h2>
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
                {workouts.map((w, i) => (
                  <tr key={w.id || i}>
                    {columns.map((col) => (
                      <td key={col}>{w[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {workouts.length === 0 && <div className="text-muted">No workouts available.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workouts;
