import { useEffect, useState } from "react";
import axios from 'axios';

export default function List() {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/stories')
            .then(res => {
                setStories(res.data)
            })
            .catch(err => console.error(err));
    }, []);

    const [donate, setDonate] = useState({
        storyId: '',
        donorName: '',
        amount: ''
    });

    const changeHandler = e => {
        setDonate(d => ({
            ...d,
            [e.target.id]: e.target.value
        }));
    };

    const handleDonate = (donate) => {
        axios.post('http://localhost:3000/donate', donate)
            .then(() => window.location.reload())
            .catch(err => console.error(err));
        setDonate({});
    };

    return (
        <div className="home_content">
            <h2>They need your help</h2>
            <div className="stories">
                {stories.map(story => (
                    <div key={story.id} className="p-4">
                        <h3 className="title">{story.title}</h3>
                        <p className="story_text">{story.text}</p>
                        <p className="story_text">Goal: ${story.goal_amount}</p>
                        <p className="story_text">Collected: ${story.collected_amount}</p>
                        {story.collected_amount < story.goal_amount && (
                            <div className="donate">
                                <input type="text" placeholder="Your Name" className="donate_input" id="donorName" onChange={changeHandler} value={donate.donorName} />
                                <input type="number" placeholder="Amount" className="donate_input" id="amount" onChange={changeHandler} value={donate.amount} />
                                <button className="button42 lime" onClick={_ => handleDonate(donate)}>Donate</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};