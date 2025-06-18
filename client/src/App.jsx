// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #e0eafc, #cfdef3)'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        textAlign: 'center',
        color: '#1e3a8a',
        textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
      }}>
        FullStack Assignment<br />CodeRower Software Pvt Ltd
      </h1>
      <button
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1.25rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease'
        }}
        onClick={() => navigate('/assignment')}
        onMouseOver={(e) => e.target.style.backgroundColor = '#1d4ed8'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#2563eb'}
      >
        Go to Assignment
      </button>
    </div>
  );
}

function NavBar({ togglePage, currentPage }) {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#e0e7ff', display: 'flex', justifyContent: 'center', borderBottom: '2px solid #c7d2fe' }}>
      <button onClick={togglePage} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Switch to {currentPage === 'configurationdetails' ? 'Update Configuration' : 'Configuration Details'}
      </button>
    </nav>
  );
}

function AssignmentPage() {
  const [currentPage, setCurrentPage] = useState('configurationdetails');

  const togglePage = () => {
    setCurrentPage((prev) =>
      prev === 'configurationdetails' ? 'updateconfiguration' : 'configurationdetails'
    );
  };

  const [viewConfigId, setViewConfigId] = useState('');
  const [viewData, setViewData] = useState(null);
  const [updateConfigId, setUpdateConfigId] = useState('');
  const [remark, setRemark] = useState('');
  const [updateResponse, setUpdateResponse] = useState(false);

  const fetchData = async () => {
    try {
      const result = await fetch(`http://localhost:5000/api/configurations/${viewConfigId}`);
      const json = await result.json();
      setViewData(json);
    } catch (err) {
      console.error('Error fetching configuration:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/configurations/${updateConfigId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ remark })
      });
      await res.json();
      setUpdateResponse(true);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <>
      <NavBar togglePage={togglePage} currentPage={currentPage} />

      {currentPage === 'configurationdetails' ? (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ padding: '2rem', maxWidth: '800px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e40af', textAlign: 'center' }}>Configuration Details</h2>
            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="viewId" style={{ fontWeight: 'bold' }}>Config To Load (configId):</label>
              <input
                id="viewId"
                type="text"
                value={viewConfigId}
                onChange={(e) => setViewConfigId(e.target.value)}
                style={{ marginLeft: '0.75rem', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button onClick={fetchData} style={{ marginLeft: '1rem', padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px' }}>Submit</button>
            </div>
            {viewData && (
              <div style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '1rem', backgroundColor: '#ffffff' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <tbody>
                    {viewData.matrix && viewData.matrix.map((row, rowIndex) => (
                      <tr key={rowIndex} style={{ backgroundColor: rowIndex % 2 === 0 ? '#f8fafc' : '#e2e8f0' }}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{ border: '1px solid #cbd5e1', padding: '0.75rem', textAlign: 'center' }}
                          >
                            {typeof cell === 'object' ? JSON.stringify(cell) : String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ height: 'calc(100vh - 80px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ padding: '2rem', maxWidth: '700px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#1e40af', textAlign: 'center' }}>Update Configuration</h2>
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="updateId" style={{ fontWeight: 'bold' }}>Config To Update (configId):</label>
              <input
                id="updateId"
                type="text"
                value={updateConfigId}
                onChange={(e) => setUpdateConfigId(e.target.value)}
                style={{ marginLeft: '0.10rem', padding: '0.4rem 0.6rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="remark" style={{ fontWeight: 'bold' }}>Remark:</label><br />
              <textarea
                id="remark"
                rows="4"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                style={{ marginTop: '0.5rem', padding: '0.6rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
              ></textarea>
            </div>
            <button onClick={handleUpdate} style={{ padding: '0.6rem 1.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', width: '103%' }}>Submit</button>

            {updateResponse && (
              <div style={{ marginTop: '1.5rem', color: '#16a34a', fontWeight: 'bold', textAlign: 'center' }}>
                Success
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
