export default function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [goalAmount, setGoalAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/stories', {
            title,
            description,
            goal_amount: goalAmount,
            user_id: 1 // Placeholder for now
        }).then(() => alert('Story submitted for approval'))
            .catch(err => console.error(err));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl mb-4">Create a Fundraising Story</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Title" className="p-2 border" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Description" className="p-2 border" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Goal Amount" className="p-2 border" value={goalAmount} onChange={(e) => setGoalAmount(e.target.value)} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            </form>
        </div>
    );
};