import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/logs').then(res => setLogs(res.data));
  }, []);

  return (
    <Layout>
      <h1>System Logs</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Action</th>
              <th>User</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
                <td><strong>{log.action}</strong></td>
                <td>{log.userId?.name || 'Unknown'}</td>
                <td style={{fontFamily: 'monospace', fontSize: '0.85rem', color: '#555'}}>
                   {JSON.stringify(log.meta)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}