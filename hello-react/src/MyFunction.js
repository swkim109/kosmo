import React, {useState, useEffect, Fragment} from 'react';
import Circle from './Circle';
import Square from "./Square";

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
        
        <div style={{marginLeft: "20px", marginTop: "20px"}}>
            <Circle handleClick={handleClick} filled={flag} />
            <Square filled={flag} />
        </div>
        
    );
    
}

export default MyComp;

