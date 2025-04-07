export default function List() {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/stories')
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, []);

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
                    </div>
                ))}
            </div>
        </div>
    );
};