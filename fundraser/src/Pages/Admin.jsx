import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {

    const [stories, setStories] = useState([]);
    const [storyApproved, setStoryApproved] = useState(null);
    const [deleteStory, setDeleteStory] = useState(null);
    const [approvedStory, setApprovedStory] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/pending')
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, [storyApproved]);

    const approveStory = (id) => {
        axios.patch(`http://localhost:3001/approve/${id}`)
            .then(_ => {
                setStoryApproved('Story approved successfully');
                setApprovedStory(null);
                setTimeout(() => setStoryApproved(null), 3000);
            })
            .catch(err => console.error(err));
    };

    const destroyStory = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(_ => {
                setStoryApproved('Story deleted successfully');
                setDeleteStory(null);
                setTimeout(() => setStoryApproved(null), 3000);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <section className="admin_panel">
                <h2>Welcome to admin panel</h2>
                <h3>Pending stories for approval</h3>
                <div className="stories_list">
                    {stories.map(story => (
                        <div key={story.id} className="stories">
                            <h3 className="title">{story.title}</h3>
                            <p className="story_text">{story.text}</p>
                            <p className="story_text"><b>Goal:</b> {story.goal_amount.toLocaleString("fi-FI", {style:"currency", currency:"EUR"})}</p>
                            <p className="story_text"><b>Collected:</b> {story.collected_amount.toLocaleString("fi-FI", {style:"currency", currency:"EUR"})}</p>
                            {!story.approved && (
                                <>
                                    <button className="button42 lime" onClick={_ => setApprovedStory(story)}>Approve</button>
                                    <button className="button42 red" onClick={_ => setDeleteStory(story)}>Delete</button>
                                </>
                            )}
                            {deleteStory !== null ?
                                <div className="confirm_msg">
                                    <div className="confirm_content">
                                        <h2>Are you sure you want to delete "{deleteStory.title}" fundraiser?</h2>
                                        <div>
                                            <button className="button42 red" onClick={_ => destroyStory(deleteStory.id)}>Delete</button>
                                            <button className="button42 tang" onClick={_ => setDeleteStory(null)}>Cancel</button>
                                        </div>
                                    </div>
                                </div> : null}
                            {approvedStory !== null ?
                                <div className="confirm_msg">
                                    <div className="confirm_content">
                                        <h2>Approve "{approvedStory.title}" fundraiser?</h2>
                                        <div>
                                            <button className="button42 lime" onClick={_ => approveStory(approvedStory.id)}>Approve</button>
                                            <button className="button42 tang" onClick={_ => setApprovedStory(null)}>Cancel</button>
                                        </div>
                                    </div>
                                </div> : null}
                        </div>
                    ))}
                    {stories.length === 0 ? <div className="pending"><h3>There is no pending stories</h3></div> : null}
                </div>
            </section>
            {storyApproved !== null ? <div className="modal_msg"><h2>{storyApproved}</h2></div> : null}
        </>

    );
};