import { useState } from "react";
import axios from 'axios';

export default function Create() {

    const [newStory, setNewStory] = useState({
        title: '',
        text: '',
        goal_amount: ''
    });
    const [storyUpload, setStoryUpload] = useState(null);
    
    const handleSubmit = (e) => {
        if (!newStory.title || !newStory.text || !newStory.goal_amount) {
            setStoryUpload("Username and password cannot be empty.");
            setTimeout(_ => {
                setStoryUpload(null);
            }, 2000);
            return;
        };

        axios.post('http://localhost:3001/stories', newStory, { withCredentials: true })
        .then(() => alert('Story submitted for approval'))
            .catch(err => console.error(err));
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    return (
        <section className="create">
            <div className="create_content">
                <h1>Create a Fundraising Story</h1>
                <div className="create_form">
                    <input type="text" placeholder="Title" className="create_input" value={newStory.title} onChange={(e) => setNewStory(e.target.value)}/>
                    <textarea placeholder="Description" className="create_input" value={newStory.text} onChange={(e) => setNewStory(e.target.value)}/>
                    <input type="number" placeholder="Goal Amount" className="create_input" value={newStory.goal_amount} onChange={(e) => setNewStory(e.target.value)}/>
                    <button className="button42 hgreen" >Create Story</button>
                    <button className="button42 red" onClick={goHome}>Go back</button>
                </div>
            </div>
            {storyUpload !== null ? <div className="modal_msg"><h1>{storyUpload}</h1></div> : null}
        </section>
    );
};