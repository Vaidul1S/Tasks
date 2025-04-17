import { useState } from "react";
import axios from 'axios';

export default function Create() {

    const [newStory, setNewStory] = useState({
        title: '',
        text: '',
        goal_amount: ''
    });
    const [storyUpload, setStoryUpload] = useState(null);

    const changeHandler = e => {
        setNewStory(n => ({
            ...n,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        if (!newStory.title || !newStory.text || !newStory.goal_amount) {
            setStoryUpload("Title, description and goal amount fields cannot be empty.");
            setTimeout(_ => {
                setStoryUpload(null);
            }, 2000);
            return;
        };

        axios.post('http://localhost:3001/stories', newStory, { withCredentials: true })
            .then(res => {
                setStoryUpload('Story submitted for approval');
                setTimeout(() => {
                    setStoryUpload(null);
                }, 2000);
            })
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
                    <input type="text" placeholder="Title" className="create_input" id="title" value={newStory.title} onChange={changeHandler} />
                    <textarea placeholder="Description" className="create_input" id="text" value={newStory.text} onChange={changeHandler} />
                    <input type="number" placeholder="Goal Amount" className="create_input" id="goal_amount" value={newStory.goal_amount} onChange={changeHandler} />
                    <button className="button42 hgreen" onClick={_=> handleSubmit(newStory)}>Create Story</button>
                    <button className="button42 red" onClick={goHome}>Go back</button>
                </div>
            </div>
            {storyUpload !== null ? <div className="modal_msg"><h1>{storyUpload}</h1></div> : null}
        </section>
    );
};