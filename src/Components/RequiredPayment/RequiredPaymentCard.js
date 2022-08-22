import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios';
import {useNavigate } from 'react-router';
import PremiumsPopup from '../PopUp/PremiumsPopup';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';

export let updatedId=0;

function RequiredPaymentCard(props){

    let repeaternote;
    let bgColor;

    const token=localStorage.getItem('userToken');
    const route=useNavigate();
    const [errMsg,setErrMsg]=useState();

    if(props.repeater==1){
        repeaternote='visible';
        bgColor='rgb(229 181 37 / 21%)';
    }
    else{
        repeaternote='hidden';
        bgColor='rgb(209 216 226 / 57%)';
    }


    //***************Delete Req*********************/

    const deleteReq=(e)=>{

        axios.get(`http://localhost:5000/managment/deleteInstallment/${props.id}`,
                  {
                    headers:{
                        authorization:`bearer ${token}`
                    }
                  }
        ).then(res=>{

            window.location.reload(false);

        }).catch(err=>{

            if (!err.response){
                setErrMsg(<h4 >No Server Response</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
                setErrMsg(<h4>{err.response.data.message}</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
                setErrMsg(<h4>{err.message}</h4>);
                showPopupNote();
            }
            else {
                setErrMsg(<h4>Failed</h4>);
                showPopupNote();
            }

        })

    }

    //*****************Update Req*******************/

    const updateReq=(e)=>{

        updatedId=props.id;
        route("/Mangment/InsertRequiredPayments");

    }


    //**************Monthly Installment**************/

    const monthly=(e)=>{

        axios.get(`http://localhost:5000/managment/monthlyinstallment/${props.id}`,
                  {
                    headers:{
                        authorization:`bearer ${token}`
                    }
                  }
        ).then(res=>{

            window.location.reload(false);

        }).catch(err=>{

            if (!err.response){
                setErrMsg(<h4 >No Server Response</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
                setErrMsg(<h4>{err.response.data.message}</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
                setErrMsg(<h4>{err.message}</h4>);
                showPopupNote();
            }
            else {
                setErrMsg(<h4>Failed</h4>);
                showPopupNote();
            }

        })

    }

    //*************pop Up add premiums***************/

    const handlePopup=(e)=>{
        e.preventDefault();
        $(".popupPre").fadeTo(700,1);
        $(".fullscreenPre").fadeTo(700,1);
        $('body').css("overflow","hidden");
    }

    //********************Pay Now*********************/

    const pay=(e)=>{

        axios.post(`http://localhost:5000/managment/addInstallment/${props.id}`,
                  {
                    payment:props.value
                  },
                  {
                    headers:{
                        authorization: `bearer ${token}`
                    }
                  }  
        ).then(res=>{

            window.location.reload(false);

        }).catch(err=>{

            if (!err.response){
                setErrMsg(<h4 >No Server Response</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&err.response.data.message){
                setErrMsg(<h4>{err.response.data.message}</h4>);
                showPopupNote();
            }
            else if(err.response.status!==200&&err.response.status!==201&&!err.response.data.message){
                setErrMsg(<h4>{err.message}</h4>);
                showPopupNote();
            }
            else {
                setErrMsg(<h4>Failed</h4>);
                showPopupNote();
            }

        })

    }

    //************************************************/


    return (
        <>
        <NotePopup msg={errMsg} color='red'/>
        <PremiumsPopup title="Add Premiums" id={props.id}/>
        <div style={{width:'300px',minHeight:'550px',lineHeight:'40px',borderRadius:'20px',padding:'10px',backgroundColor:bgColor,marginBottom:'20px',marginRight:'15px',display:'flex',flexDirection:'column',boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.25)'}}>

            {
                props.repeater==1?
            
                     <div style={{height:'100%',display:'flex',flexDirection:'column'}}>

                            <span style={{color:'#11324D'}}>
                                Payment Name &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.name}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Type &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.type}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Price &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.value} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Expiry Date &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.date}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Repeater &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.repeater==1?'Yes':'No'}</span> 
                            </span>
        

        

                            <span style={{color:'#11324D'}}>
                                The Rest &nbsp;:&nbsp;&nbsp;                           
                                <span style={{color:'#6B7AA1'}}>{props.rest} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Paid So Far &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.paid} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Monthly Installment &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1',fontSize:'15px'}}>{props.monthly} s.p</span> 
                            </span>
            
                            <div style={{visibility: repeaternote}}>
                                {props.message==1?<span style={{color:'green'}}>Paid this month</span>:<span style={{color:'red'}}>No payment yet this month</span>}
                            </div>
                    </div>
                
                :<div style={{height:'100%',display:'flex',flexDirection:'column',lineHeight:'63.5px'}}>

                            <span style={{color:'#11324D'}}>
                                Payment Name &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.name}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Type &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.type}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Price &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.value} s.p</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Expiry Date &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.date}</span> 
                            </span>

                            <span style={{color:'#11324D'}}>
                                Payment Repeater &nbsp;:&nbsp;&nbsp;
                                <span style={{color:'#6B7AA1'}}>{props.repeater==1?'Yes':'No'}</span> 
                            </span>

                </div>
            }
            

            <div style={{marginBlock:'10px',marginInline:'auto'}}>
                <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',borderRadius:'10px'}} onClick={deleteReq}> Delete</button>
            
                <button type='button' className='btn-insert' style={{width:'100px',borderRadius:'10px'}} onClick={updateReq}> Update</button>
            </div>


            {
                props.repeater==1?
                <>
                     <div style={{marginBlock:'10px',marginInline:'auto'}}>
                        <button type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',fontSize:'11px',borderRadius:'10px'}} onClick={monthly}> Monthly Payment</button>
                        <button type='button' className='btn-insert' style={{width:'100px',fontSize:'11px',borderRadius:'10px'}} onClick={handlePopup}> Add premiums</button>
                    </div>
                </>:
                <>  
                     <button  type='button' className='btn-insert' style={{width:'100px',justifyContent:'center',marginBlock:'10px',marginInline:'auto',borderRadius:'10px'}} onClick={pay}>Pay Now</button>
                </>
            }

        </div>
        </>
    );
}

export default RequiredPaymentCard;