import React from 'react';
import './Marker.css';
import j from '../../../../Images/Jacket.webp';
import { useSelector } from 'react-redux';

function Marker({image,color}) {

    return (

            <button type='button' className='marker-btn' style={{backgroundColor:color,borderColor:color}}>

                <img src={`http://localhost:5000/${image}`} alt="product image" className='marker-img'/> 

            </button>
    );
}

export default Marker;