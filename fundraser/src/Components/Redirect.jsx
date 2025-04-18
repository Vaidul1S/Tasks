import { useEffect, useState } from "react";

export default function Redirect() {

    const [redirect, setRedirect] = useState(null);

    useEffect(_=> {
        setRedirect('Please login or sign up.');
        setTimeout(_ => {
            window.location.hash = '#';
        }, 2000);
    },[]);

    return(
        <>
        {redirect !== null ? <div className="modal_msg"><h1>{redirect}</h1></div> : null}
        </>
    );
};