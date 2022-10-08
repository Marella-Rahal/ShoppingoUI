import React ,{useState,useEffect} from 'react';
import {Container,InnerContainer,TopNavbar,Content} from '../AddProduct/Home/AddProductCss.js';
import HeaderImage from '../Profile/HeaderImage';
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import { AddShoppingCart, ArrowDropDown, Favorite } from '@mui/icons-material';
import { Link ,Route} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { PaymentsContainer, PaymentsInfo, Paragraph,Button} from '../InsertPaymentPage/InsertPaymentcss';
import './RequiredPayment.css';
import RequiredPaymentCard from './RequiredPaymentCard.js';
import IncomePopup from '../PopUp/IncomePopup';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup.js';
import {filterReqPayments} from '../../Redux/Slices/PaymentReqSlice';


function RequiredPayment(props){
    const route=useNavigate();
    const user=useSelector(state=>state.user.user);
    const req=useSelector(state=>state.payReq.paymentReq);
    // const necessary=useSelector(state=>state.payReq.message);
    const token=localStorage.getItem('userToken');
    const dispatch=useDispatch();
    const [errMsg,setErrMsg]=useState('');
    const [image,setImage]=useState();

    useEffect(()=>{
      
      if(user.imageUrl.length>1){
        setImage(`http://localhost:5000/${user.imageUrl}`);
      }
      else{
        setImage(require('../../Images/Default.jpg'));
      }
    })

    // useEffect(()=>{

    //     if(necessary.length>0){
    //         const n=necessary.map(n => {
    //             return <h4> {n} </h4>
    //         })
    
    //         setErrMsg(n);
    //         showPopupNote();
    //     }

    // },[]);

    const handlePopup=(e)=>{
        e.preventDefault();
        $(".popupdiv").fadeTo(700,1);
        $(".fullscreen").fadeTo(700,1);
        $('body').css("overflow","hidden");
    }

    const handleFilter= async (filter,value)=>{

        let f_price,f_date,f_priorty;
        if(filter==='price'){
            f_price=value;
            f_date='';
            f_priorty='';
        }
        else if(filter==='date'){
            f_price='';
            f_date=value;
            f_priorty='';
        }
        else if(filter==='priorty'){
            f_price='';
            f_date='';
            f_priorty=value;
        }

        try {
            
            const res=await axios.post(
                'http://localhost:5000/managment/filterreqpayments',
                {
                    filterbyvalue:f_price,
                    filterbydate:f_date,
                    filterbypri:f_priorty,
                },
                {
                    headers:{
                        authorization : `Bearer ${token}`
                    }
                });

            dispatch(filterReqPayments(res.data));   

        } catch (err) {
        
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
            
        }
    }

    return(
        <Container>
            <NotePopup msg={errMsg} color='red'/>
            <IncomePopup title="Please Insert Your Income Value"/>
            <SideNavbar/>
            <InnerContainer>
                <TopNavbar style={{ justifyContent: 'end' }}>
                    <div
                    style={{
                    display: 'flex',
                    paddingTop: '10px',
                    paddingRight: '10px',
                    height: '100%',
                    }}
                    >
                        <Link to="/Favourite">
                        <IconButton onClick={() => { route('/Favourite');}} style={{ color: '#6B7AA1' }}>
                            <Favorite />
                        </IconButton>
                        </Link>

                        <Link to="/ShoppingCard">
                        <IconButton onClick={() => { route('/ShoppingCard');}} style={{ color: '#6B7AA1' }}>
                            <AddShoppingCart />
                        </IconButton>
                        </Link>

                        <div style={{ marginTop: "10px", fontSize: '15px' }}>
                        Hello , user{user.name}</div>

                        <HeaderImage image={image}></HeaderImage>

                    </div>

                </TopNavbar>

                <Content style={{ flexDirection: 'column' }} >

                    <PaymentsContainer>

                        <PaymentsInfo>

                            <Paragraph>Total income</Paragraph>
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Paragraph>{user.income}
                            2000000 S.P</Paragraph>
                            <button style={{background:"none",border:"none",color: "#11324D"}} onClick={handlePopup}>
                                <AddCircleOutlineIcon style={{ marginRight: "15px", fontSize: "xx-large" }}></AddCircleOutlineIcon>
                            </button>
                            </div>
                        </PaymentsInfo>

                        <PaymentsInfo style={{ margin: '0px 5%' }}>
                            <Paragraph>Balance</Paragraph>
                            <Paragraph>{user.totalBalance}
                            1900000 S.P</Paragraph>
                        
                        </PaymentsInfo>

                        <PaymentsInfo>
                            <Paragraph>
                            Total Payments
                            </Paragraph>
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Paragraph>{user.totalPayments}
                            100000 S.P </Paragraph>
                            
                            <Link to='/Mangment/Dashbord' style={{ marginRight: "10px",textDecoration: "none" , color: "#6b7aa1" ,fontSize:"small"}}>View All<KeyboardDoubleArrowRightIcon style={{fontSize:"small"}}/></Link>
                            </div>
                        </PaymentsInfo>

                    </PaymentsContainer>

                    <h2 style={{ color: '#11324D', marginTop: '25px' }}>
                        Required Payment
                    </h2>

                    <div className='filter-bar'>
                        Filter By
                        <div className='filter'>
                            Price  <ArrowDropDown />

                            <div className='menufilter'>
                                <button className='btn-filter' type='button' onClick={()=>handleFilter('price','low')}>Low To Hight</button>
                                <button className='btn-filter' type='button' onClick={()=>handleFilter('price','high')}>Hight To Low</button>
                            </div >
                        </div>

                        <div className='filter' style={{marginRight:'10px'}} onClick={()=>handleFilter('priorty','high')}>
                            Priorty  
                            {/* <ArrowDropDown /> */}
                        </div>

                        <div className='filter'>
                            date of Payment  <ArrowDropDown />
                            <div className='menufilter' style={{left:'40px'}}>
                                <button className='btn-filter' type='button' onClick={()=>handleFilter('date','low')}>Oldest To Newest</button>
                                <button className='btn-filter' type='button' onClick={()=>handleFilter('date','high')}>Newest To Oldest</button>
                            </div>
                        </div>

                        <button type='button' onClick={()=>{route('/Mangment/InsertRequiredPayments')}} className="btn-insert">Insert New Payment</button>

                    </div>

                    <hr style={{
                        width: '97%',
                        height: '2px', 
                        marginTop:'2px'
                    }}/>

                    <div style={{width:'97%',display:'flex',flexWrap:'wrap',justifyContent:'space-evenly'}}>

                    <RequiredPaymentCard id='1' name='Loan' type='Bank' value='1000000' date='21-3-2025' repeater='1'
                               rest='1000000'
                               paid='0'
                               monthly='25000'
                               message='0'/>

                        {
                            req.map((onereq,index)=>{
                               return <RequiredPaymentCard key={index} id={onereq._id} name={onereq.name} type={onereq.type} value={onereq.value} date={onereq.date} repeater={onereq.isRepeater}
                               rest={onereq.almotabaki}
                               paid={onereq.paymentuntilnow}
                               monthly={onereq.everyPaidValueRepeater}
                               message={onereq.Ispaied}/>
                            })
                        }
                        

                    </div>

                </Content>

            </InnerContainer>

        </Container>            
    );
}

export default RequiredPayment;