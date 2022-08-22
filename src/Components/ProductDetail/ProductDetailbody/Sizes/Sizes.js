import React from 'react';
import './Sizes.css';

function Sizes(props) {
    return (
        <>
            <input required type='radio' name="size" className='radio-style' style={{width:'20px',height:'20px',border:'solid 1px',marginInline:'8px'}} onClick={()=>props.setSizes([props.size])}/>
            <h5 style={{fontWeight:'bold',display:'inline'}}>{props.size}</h5>
        </>
    );
}

export default Sizes;