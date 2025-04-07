import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token);
        alert('Login successful');
        navigate('/');
      })
      .catch(err => alert('Login failed'));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="p-2 border" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

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

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App1() {
  return (
    <Router>
      <nav className="p-4 bg-blue-600 text-white flex justify-between">
        <h1 className="text-xl font-bold">Fundraising Platform</h1>
        <div>
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/create" className="mr-4">Create Story</Link>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="/create" element={<CreateStory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

function StoryList() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/stories')
      .then(res => setStories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDonate = (storyId, donorName, amount) => {
    axios.post('http://localhost:5000/donate', { story_id: storyId, donor_name: donorName, amount })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Fundraising Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stories.map(story => (
          <div key={story.id} className="p-4 border rounded shadow">
            <h3 className="text-xl font-bold">{story.title}</h3>
            <p>{story.description}</p>
            <p>Goal: ${story.goal_amount}</p>
            <p>Collected: ${story.collected_amount}</p>
            {story.collected_amount < story.goal_amount && (
              <div className="mt-2">
                <input type="text" placeholder="Your Name" className="p-2 border mr-2" id={`name-${story.id}`} />
                <input type="number" placeholder="Amount" className="p-2 border mr-2" id={`amount-${story.id}`} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => {
                  const name = document.getElementById(`name-${story.id}`).value;
                  const amount = parseFloat(document.getElementById(`amount-${story.id}`).value);
                  handleDonate(story.id, name, amount);
                }}>Donate</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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

