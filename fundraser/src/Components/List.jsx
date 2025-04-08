import { useEffect, useState } from "react";
import axios from 'axios';

export default function List() {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/stories')
            .then(res => setStories(res.data))            
            .catch(err => console.error(err));
    }, []);

    const handleDonate = (storyId, donorName, amount) => {
        axios.post('http://localhost:3000/donate', { id: storyId, donor_name: donorName, amount })
            .then(() => window.location.reload())
            .catch(err => console.error(err));
    };

    return (
        <div className="p-4">
            <h2 className="text">Fundraising Stories</h2>
            <div className="grid">
                {stories.map(story => (
                    <div key={story.id} className="p-4">
                        <h3 className="text">{story.title}</h3>
                        <p>{story.text}</p>
                        <p>Goal: ${story.goal_amount}</p>
                        <p>Collected: ${story.collected_amount}</p>
                        {story.collected_amount < story.goal_amount && (
                            <div className="mt-2">
                                <input type="text" placeholder="Your Name" className="p-2 border mr-2" id={`name-${story.id}`} />
                                <input type="number" placeholder="Amount" className="p-2 border mr-2" id={`amount-${story.id}`} />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded">Donate</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};