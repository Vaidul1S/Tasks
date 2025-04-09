import { useState, useEffect } from 'react';
import axios from 'axios';




function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/register', { username, password })
      .then(() => alert('Registration successful'))
      .catch(err => alert('Registration failed'));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="p-2 border" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
}

export default App;

function AdminPanel() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stories')
      .then(res => setStories(res.data))
      .catch(err => console.error(err));
  }, []);

  const approveStory = (id) => {
    axios.put(`http://localhost:5000/stories/approve/${id}`)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Admin Panel</h2>
      <div>
        {stories.map(story => (
          <div key={story.id} className="p-4 border rounded shadow mb-2">
            <h3 className="text-xl font-bold">{story.title}</h3>
            <p>{story.description}</p>
            <p>Goal: ${story.goal_amount}</p>
            <p>Collected: ${story.collected_amount}</p>
            {!story.approved && (
              <button className="bg-green-600 text-white px-4 py-2 rounded mt-2" onClick={() => approveStory(story.id)}>Approve</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

