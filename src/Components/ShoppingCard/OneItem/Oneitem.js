import React, { useState } from 'react';
import './Oneitem.css';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { HighlightOff } from '@material-ui/icons';
import axios from 'axios';

function Oneitem(props) {

    const token=localStorage.getItem('userToken');

    const removeOne=(e)=>{

        axios.post('http://localhost:5000/cart/deleteFromCart',
                  {
                    id:props.i_id
                  },
                  {
                    headers:{
                        authorization: `bearer ${token}`
                    }
                  }
        ).then(res=>{

            props.setCartItems(prev=>{
                return prev.filter(one=>one.id!==props.i_id)
            })

        }).catch(err=>{

            if (!err.response){
                props.setErrMsg(<h4 >No Server Response</h4>);
                props.showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
                props.setErrMsg(<h4>{err.response.data.message}</h4>);
                props.showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
                props.setErrMsg(<h4>{err.message}</h4>);
                props.showPopupNote();
            }
            else {
                props.setErrMsg(<h4>Failed</h4>);
                props.showPopupNote();
            }

        })

    }

    //**************Update Quantity******************/

    const updateQuantity=(operation)=>{

        if((operation=='-'&&props.qty>1)||operation=='+'){

            axios.post('http://localhost:5000/cart/updatequantity',
                        {
                            product:props.i_id,
                            quantity:operation=='+'?props.qty+1:props.qty-1
                        },
                            {
                                headers:{
                                    authorization :`bearer ${token}`
                                }
                            }
            ).then(res=>{
                
                props.setCartItems(prev=>{
                    return prev.map(one=>{
                        if(one.id==props.i_id){
                            operation=='+'?one.qty+=1:one.qty-=1;
                        }
                        return one;
                    })
                })

            }).catch(err=>{
                
                if (!err.response){
                    props.setErrMsg(<h4 >No Server Response</h4>);
                    props.showPopupNote();
                }
                else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
                    props.setErrMsg(<h4>{err.response.data.message}</h4>);
                    props.showPopupNote();
                }
                else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
                    props.setErrMsg(<h4>{err.message}</h4>);
                    props.showPopupNote();
                }
                else {
                    props.setErrMsg(<h4>Failed</h4>);
                    props.showPopupNote();
                }

            })

        }

    }


    //***********************************************/


    return (
        <div className='div-container'>
            <div className='oneitem'>

                <div className='items-padding'>
                    <h5>Photo</h5>
                    <img src={`http://localhost:5000/${props.img}`} alt="Product img" style={{width:'100px',height:'100px',borderRadius:'20px'}}/>
                </div>

                <div className='items-padding'>
                    <h5>Location</h5>
                    <div className='location'>
                        <span className='store-name'>{props.name}
                        </span><br/>
                        <Link to={`/ProductDetail/${props.p_id}`} className='view-map'>view on map</Link>
                    </div>
                </div>

                <div className="items-padding">
                    <h5>Color</h5>
                    <div style={{width:'40px',height:'40px',border:'solid 1px black',borderRadius:'2px',backgroundColor:`${props.color}`,marginTop:'35px'}}/>
                </div>

                <div className='items-padding'>
                    <h5>Size</h5>
                    <div className='size'>{props.size}</div>
                </div>

                <div className='items-padding'>
                    <h5>Quantity</h5>
                    <button type="button" className='dec-btn' onClick={()=>updateQuantity('-')}>-</button>

                    <p className="quantity-counter">{props.qty}</p>

                    <button type="button" className='inc-btn' onClick={()=>updateQuantity('+')}>+</button>
                </div>

                <div className='items-padding'>
                    <h5>Price</h5>
                    <div className='price'>
                        {props.price} s.p
                    </div>
                </div>

                <div className='items-padding'>
                    <h5>Remove</h5>
                    <IconButton onClick={removeOne}>
                        <HighlightOff style={{fontSize:'45px',marginTop: '25px'}}/>
                    </IconButton> 
                </div>

            </div>
            <hr className='hr' style={{border:'solid 1.5px'}}/>
        </div>  
    );
}

export default Oneitem;