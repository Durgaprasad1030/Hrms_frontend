import { useEffect, useState } from 'react';
import api from '../api/axios';
import Layout from '../components/Layout';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [newTeamName, setNewTeamName] = useState('');

  const fetchData = async () => {
    const [teamRes, empRes] = await Promise.all([api.get('/teams'), api.get('/employees')]);
    setTeams(teamRes.data);
    setEmployees(empRes.data);
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!newTeamName) return;
    await api.post('/teams', { name: newTeamName });
    setNewTeamName('');
    fetchData();
  };

  const handleAddMember = async (teamId, employeeId) => {
    if(!employeeId) return;
    await api.post(`/teams/${teamId}/members`, { employeeId });
    fetchData();
  };

  const handleRemoveMember = async (teamId, employeeId) => {
      await api.delete(`/teams/${teamId}/members/${employeeId}`);
      fetchData();
  };

  return (
    <Layout>
      <h1>Teams Management</h1>
      
      <div className="card" style={{maxWidth: '500px'}}>
        <form onSubmit={handleCreateTeam} className="flex-gap">
          <input placeholder="New Team Name" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>

      <div className="grid-container">
        {teams.map(team => (
          <div key={team._id} className="card" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="flex-between">
              <h3>{team.name}</h3>
              <span className="badge">{team.members.length} Members</span>
            </div>
            
            <div style={{flex: 1, marginBottom: '15px', borderTop: '1px solid #eee', paddingTop: '10px'}}>
              {team.members.map(m => (
                <div key={m._id} className="flex-between" style={{marginBottom: '5px', fontSize: '0.9rem'}}>
                  <span>{m.firstName} {m.lastName}</span>
                  <button onClick={() => handleRemoveMember(team._id, m._id)} style={{color: 'red', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>×</button>
                </div>
              ))}
              {team.members.length === 0 && <p style={{color: '#999', fontStyle: 'italic'}}>No members yet</p>}
            </div>

            <div className="flex-gap">
               <select id={`select-${team._id}`}>
                 <option value="">Select Employee...</option>
                 {employees.map(e => <option key={e._id} value={e._id}>{e.firstName} {e.lastName}</option>)}
               </select>
               <button className="btn btn-primary btn-small" onClick={() => handleAddMember(team._id, document.getElementById(`select-${team._id}`).value)}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}