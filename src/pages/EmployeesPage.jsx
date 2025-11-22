import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', position: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchEmployees = async () => {
    const res = await api.get('/employees');
    setEmployees(res.data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/employees', form);
    setForm({ firstName: '', lastName: '', email: '', position: '' });
    setIsFormVisible(false);
    fetchEmployees();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete employee?')) {
      await api.delete(`/employees/${id}`);
      fetchEmployees();
    }
  };

  return (
    <Layout>
      <div className="flex-between">
        <h1>Employees</h1>
        <button className="btn btn-primary" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? 'Close Form' : '+ Add Employee'}
        </button>
      </div>

      {isFormVisible && (
        <div className="card">
          <h3>Add New Employee</h3>
          <form onSubmit={handleSubmit} style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px'}}>
            <input placeholder="First Name" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} required />
            <input placeholder="Last Name" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} required />
            <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            <input placeholder="Position" value={form.position} onChange={e => setForm({...form, position: e.target.value})} />
            <div style={{gridColumn: 'span 2'}}>
              <button type="submit" className="btn btn-primary">Save Employee</button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td><strong>{emp.firstName} {emp.lastName}</strong></td>
                <td>{emp.email}</td>
                <td><span className="badge">{emp.position || 'Staff'}</span></td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && <tr><td colSpan="4" style={{textAlign: 'center'}}>No employees found.</td></tr>}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}