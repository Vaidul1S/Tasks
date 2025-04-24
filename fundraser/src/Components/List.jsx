import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import AuthContext from "./Auth";

export default function List() {

    const [stories, setStories] = useState([]);
    const [donateConfirmed, setDonateConfirmed] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:3001/stories')
            .then(res => {
                setStories(res.data)
            })
            .catch(err => console.error(err));
    }, []);

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
        }

        axios.post('http://localhost:3001/donate', data)
            .then(() => {
                setDonate(prev => ({ ...prev, [story_id]: { donor_name: '', amount: '' } }));
                setDonateConfirmed('Thank you for your generosity.');
                setTimeout(_ => {
                    window.location.reload();
                    setDonateConfirmed(null);
                }, 5000);

            })
            .catch(err => console.error(err));
    };

    const deleteStory = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(_ => {
                setDonateConfirmed('Story deleted successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <div className="list_content">
                <h2>They need your help</h2>
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
                                    <button className="button42 red" onClick={_ => deleteStory(story.id)}>Delete</button>
                                    : null
                            }
                        </div>
                    ))}
                </div>
            </div>
            {donateConfirmed !== null ? <div className="modal_msg"><h2>{donateConfirmed}</h2></div> : null}
        </>

    );
};