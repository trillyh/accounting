import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Playground() {
    const[sessionId, setSession] = useState(null)


    return (
        <>
            <h1>Accounting Playground</h1>
            <p>Use this playground to experiment with accounting rules and concepts without logging in.</p>
        </>
    )
}

export default Playground