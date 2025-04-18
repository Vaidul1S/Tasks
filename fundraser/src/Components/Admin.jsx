import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {

    const [stories, setStories] = useState([]);
    const [storyApproved, setStoryApproved] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/pending')
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, []);

    const approveStory = (id) => {
        axios.patch(`http://localhost:3001/approve/${id}`)
            .then(_ => {
                setStoryApproved('Story approved successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .catch(err => console.error(err));
    };

    return (
        <section className="admin_panel">
            <h1>Welcome to admin panel</h1>
            <div className="stories_list">
                {stories.map(story => (
                    <div key={story.id} className="stories">
                        <h3 className="title">{story.title}</h3>
                        <p className="story_text">{story.text}</p>
                        <p className="story_text">Goal: ${story.goal_amount}</p>
                        <p className="story_text">Collected: ${story.collected_amount}</p>
                        {!story.approved && (
                            <button className="button42 lime" onClick={_=> approveStory(story.id)}>Approve</button>
                        )}
                    </div>
                ))}
            </div>
            {storyApproved !== null ? <div className="modal_msg"><h1>{storyApproved}</h1></div> : null}
        </section>
    );
};