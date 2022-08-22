import { Delete } from '@material-ui/icons';
import React from 'react';
import './Removebutton.css';

function Removebutton(props) {
    return (
        <div className='remove'>
            <button onClick={props.removeAll} type='button' className='remove-btn'>
                <Delete/>
                Remove All
            </button>  
        </div>
    );
}

export default Removebutton;