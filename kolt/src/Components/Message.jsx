export default function Message(messages, setMessages) {
    
    return (
        <>
            <div className={messages.messages.type}>
                <p>{messages.messages.title}</p>
                <p>{messages.messages.text}</p>
            </div >        

        </>

    )

}