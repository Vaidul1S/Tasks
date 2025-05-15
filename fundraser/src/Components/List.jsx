import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import AuthContext from "./Auth";

export default function List() {

    const [stories, setStories] = useState([]);
    const [donateConfirmed, setDonateConfirmed] = useState(null);
    const [deleteStory, setDeleteStory] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3001/stories')
            .then(res => {
                setStories(res.data)
            })
            .catch(err => console.error(err));
    }, [donateConfirmed]);

    const [donate, setDonate] = useState({});

    const changeHandler = (e, story_id) => {
        const { id, value } = e.target;
        setDonate(d => ({
            ...d,
            [story_id]: {
                ...d[story_id],
                [id]: value
            }
        }));
    };

    const handleDonate = (story_id) => {
        const data = {
            story_id,
            ...donate[story_id]
        };

        if (!data.donor_name || !data.amount || isNaN(data.amount)) {
            setDonateConfirmed("Please enter your name and a valid amount.");
            setTimeout(_ => {
                setDonateConfirmed(null);
            }, 5000);
            return;
        };

        axios.post('http://localhost:3001/donate', data)
            .then(() => {
                setDonate(prev => ({ ...prev, [story_id]: { donor_name: '', amount: '' } }));
                setDonateConfirmed('Thank you for your generosity.');
                setTimeout(_ => {
                    setDonateConfirmed(null);
                }, 5000);

            })
            .catch(err => console.error(err));
    };

    const destroyStory = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(_ => {
                setDonateConfirmed('Story deleted successfully');
                setDeleteStory(null);
                setTimeout(() => {
                    setDonateConfirmed(null);
                }, 5000);
            })
            .catch(err => console.error(err));
    };

    const orderByGoal = _ => {
        setStories(s => [...s].sort((a, b) => b.goal_amount - a.goal_amount));
    };

    const orderById = _ => {
        setStories(s => [...s].sort((a, b) => a.id - b.id));
    };

    const orderByTitle = _ => {
        setStories(s => [...s].sort((a, b) => a.title.localeCompare(b.title)));
    };

    return (
        <>
            <div className="list_content">
                <h2>They need your help</h2>
                <h3 className="order">Order stories by</h3>
                <div>
                    <button className="button42 cadet" onClick={orderByTitle}>Title</button>
                    <button className="button42 cadet" onClick={orderByGoal}>Goal</button>
                    <button className="button42 cadet" onClick={orderById}>Add date</button>
                </div>
                <div className="stories_list">
                    {stories.map(story => (
                        <div key={story.id} className="stories">
                            <h3 className="title">{story.title}</h3>
                            <p className="story_text">{story.text}</p>
                            <p className="story_text">Goal: ${story.goal_amount}</p>
                            <p className="story_text">Collected: ${story.collected_amount}</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ '--progress': `${((story.collected_amount * 100) / story.goal_amount)}%` }}></div>
                            </div>
                            {story.collected_amount < story.goal_amount && (
                                <div className="donate">
                                    <input type="text" placeholder="Your Name" className="donate_input" id="donor_name" onChange={e => changeHandler(e, story.id)} value={donate[story.id]?.donor_name || ''} />
                                    <input type="number" placeholder="Amount" className="donate_input" id="amount" onChange={e => changeHandler(e, story.id)} value={donate[story.id]?.amount || ''} />
                                    <button className="button42 tang" onClick={_ => handleDonate(story.id)}>Donate</button>
                                </div>
                            )}
                            {
                                user !== null && user.role === 'admin' ?
                                    <button className="button42 red" onClick={_ => setDeleteStory(story)}>Delete</button>
                                    : null
                            }
                            {deleteStory !== null ?
                                <div className="confirm_msg">
                                    <div className="confirm_content">
                                        <h2>Are you sure you want to delete {deleteStory.title} fundraiser?</h2>
                                        <div>
                                            <button className="button42 red" onClick={_ => destroyStory(deleteStory.id)}>Delete</button>
                                            <button className="button42 tang" onClick={_ => setDeleteStory(null)}>Cancel</button>
                                        </div>
                                    </div>
                                </div> : null}
                        </div>
                    ))}
                </div>
            </div>
            {donateConfirmed !== null ? <div className="modal_msg"><h2>{donateConfirmed}</h2></div> : null}
        </>

    );
};