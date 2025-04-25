import { useEffect, useState } from "react";

export default function Redirect() {

    const [redirect, setRedirect] = useState(null);

    useEffect(_=> {
        setRedirect('Please login or sign up.');
        setTimeout(_ => {
            window.location.hash = '#';
        }, 3000);
    },[]);

    return(
        <>
        {redirect !== null ? <div className="screen-message"><h2>{redirect}</h2></div> : null}
        </>
    );
};