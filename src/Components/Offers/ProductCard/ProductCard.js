import React from 'react';
import './ProductCard.css';
import j from '../../../Images/Jacket.webp';
import { Favorite, Star } from '@material-ui/icons';
import { useNavigate } from 'react-router';
import  { clearSleepingPopup, showSleepingPopup, sleep } from '../../PopUp/SleepingPopup';


function ProductCard(props) {
  const route = useNavigate();

  const future=async()=>{

    showSleepingPopup();

    await sleep(2000);

    clearSleepingPopup();

  }

  return (
    <div
      className="card"
      style={{
        width: '270px',
        marginInline: '10px',
        marginBottom: '20px',
        paddingBottom: '20px',
        borderRadius: '20px',
        boxShadow: '5px 5px 5px 5px rgba(0,0,0,0.25)',
      }}
    >
      <img
        src={`http://localhost:5000/${props.image}`}
        alt="product img"
        className="card-img-top"
        style={{ borderRadius: '20px', height: '353px', maxHeight: '353px' }}
        onClick={() => route(`/ProductDetail/${props.id}`)}
      />

      <button className="card-img-overlay heart-btn-offers" onClick={future}>
        <Favorite />
      </button>

      <h4 className="text-center" style={{ color: '#0D065E' }}>
        {props.desc}
      </h4>

      <h5
        className="text-center"
        style={{ color: 'red', textDecoration: 'line-through' }}
      >
        {props.oldprice} sp
      </h5>

      <h5 className="text-center" style={{ color: '#7D6A06' }}>
        {props.newprice} sp
      </h5>

      <div style={{ textAlign: 'center' }}>
        <Star id="star1" className="star-btn-offers" onClick={future}/>
        <Star id="star2" className="star-btn-offers" onClick={future}/>
        <Star id="star3" className="star-btn-offers" onClick={future}/>
        <Star id="star4" className="star-btn-offers" onClick={future}/>
        <Star id="star5" className="star-btn-offers" onClick={future}/>
      </div>

      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <span style={{ color: '#0D065E', fontSize: '15px' }}>1.5/5</span>
        <Star
          className="star-rate"
          style={{ fontSize: '33px', color: 'yellow' }}
        />
      </div>
    </div>
  );
}

export default ProductCard;
