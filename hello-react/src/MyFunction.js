import React, {useState, useEffect} from 'react';
import Circle from './Circle';

function MyComp() {
    
    const str = "Hello, Function!";
    
    const [flag, setFlag] = useState(false);
    
    useEffect(()=>{
        
        if (flag) {
            console.log("TRUE");
        }
        
    }, [flag])
    
    const handleClick = () => {
        setFlag(!flag);
    }
    
    return (
        //<h1>{str}</h1>
        <Circle handleClick={handleClick} filled={flag} />
    );
    
}

export default MyComp;

