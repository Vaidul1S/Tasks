export default function Message(messages) {
    
    return (
        <>
            <div className={messages.messages.type}>
                <p>{messages.messages.title}</p>
                <p>{messages.messages.text}</p>
            </div >        
        </>
    );
};