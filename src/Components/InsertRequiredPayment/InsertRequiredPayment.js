import React ,{useState,useEffect}from 'react';
import axios from 'axios';
import {Container,InnerContainer,TopNavbar,Content,Label} from '../AddProduct/Home/AddProductCss.js';
import HeaderImage from '../Profile/HeaderImage';
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { Link ,Route} from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { PaymentsContainer, PaymentsInfo, Paragraph,Input, InputContainer, Button,FormContainer} from '../InsertPaymentPage/InsertPaymentcss';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/Slices/UserSlice';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';
import IncomePopup from '../PopUp/IncomePopup';
import $ from 'jquery';
import { updatedId } from '../RequiredPayment/RequiredPaymentCard.js';


export const Radio=styled.input`
    margin-inline:20px;
    width:20px;
    height:20px;
    &::after{
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 15px;
        position: absolute;
        visibility: visible;
        background-color:white;
        border:solid 1px black;
    };
    &:checked::after{
        content: '';
        width: 20px;
        height: 20px;
        border-radius: 15px;
        position: absolute;
        visibility: visible;
        background-color:red;
        border:solid 1px red;
    };

`


function InsertRequiredPayment(props){
    const token=localStorage.getItem("userToken");
    const user=useSelector((state)=>state.user);
    const payReq=useSelector((state)=>state.payReq.paymentReq);
    // console.log(payReq);
    // console.log(updatedId);
    const route=useNavigate();
    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState('');
    
    const [Name , setName]=useState('');
    const [Value, setValue] = useState('');
    const [Date, setDate] = useState('');
    const [Type, setType] = useState('Others');
    const [Repeater,setRepeater] = useState('');

    // console.log(Name,Value,Date,Type,Repeater);

    //*** puting value if i am gonna update the card ***/

    useEffect(()=>{

        let isRequested=false;

        var n,v,d,t,r;

        if(updatedId!=0){
            payReq.map(one=>{
                if(one._id==updatedId){
                    n=one.name;
                    v=one.value;
                    d=one.date;
                    t=one.type;
                    r=one.isRepeater;
                }
            })

            // console.log(n,v,d,t,r);
            // console.log(typeof(n),typeof(v),typeof(d),typeof(t),typeof(Boolean(r)));

            if(!isRequested){
                setName(n);
                setValue(v);
                setDate(d);
                setType(t);
                setRepeater(r);
            }
        }


        return ()=>{
            isRequested=true;
        }

    },[])

    
    //*************Profile Image***************/
    const [image,setImage]=useState();
    useEffect(()=>{
      
      if(user.user.imageUrl.length>1){
        setImage(`http://localhost:5000/${user.user.imageUrl}`);
      }
      else{
        setImage(require('../../Images/Default.jpg'));
      }
    })

    //****************pop Up*******************/

    const handlePopup=(e)=>{
        e.preventDefault();
        $(".popupdiv").fadeTo(700,1);
        $(".fullscreen").fadeTo(700,1);
        $('body').css("overflow","hidden");
    }

    //**************Send or Update**************/

    const sendDate = (e) => {
        e.preventDefault();

        if(updatedId){

            axios.post(`http://localhost:5000/managment/updateInstallment/${updatedId}`,
                      {
                        name : Name ,
                        value :Value ,
                        date : Date ,
                        type : Type ,
                        isRepeater : Boolean(Repeater) 

                      },
                      {
                        headers:{
                            authorization:`bearer ${token}`
                        }
                      }
            ).then(res=>{

                route('/Mangment/RequiredPayments');

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
        else{

            axios.post(
                'http://localhost:5000/managment/addPaymentReq',
                {
                    name : Name ,
                    value :Value ,
                    date : Date ,
                    type : Type ,
                    isRepeater : Boolean(Repeater) 
                },
                {
                    headers:{
                        Authorization: `bearer ${token}`
                    }
                }
            )
            .then((res)=>{
    
                dispatch(registerUser(res.data));
                route('/Mangment/RequiredPayments');
            })
            .catch((err) => {
    
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
            });

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
                        <IconButton onClick={() => { Route('/Favourite');}} style={{ color: '#6B7AA1' }}>
                            <Favorite />
                        </IconButton>
                        </Link>

                        <Link to="/ShoppingCard">
                        <IconButton onClick={() => { Route('/ShoppingCard');}} style={{ color: '#6B7AA1' }}>
                            <AddShoppingCart />
                        </IconButton>
                        </Link>

                        <div style={{ marginTop: "10px", fontSize: '15px' }}>
                        Hello , user 
                        {user.user.name}</div>

                        <HeaderImage image={image} ></HeaderImage>

                    </div>

                </TopNavbar>

                <Content style={{ flexDirection: 'column' }} >

                    <PaymentsContainer>

                        <PaymentsInfo>

                            <Paragraph>Total income</Paragraph>
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Paragraph>{user.user.income} 
                            2000000 S.P</Paragraph>
                            <button style={{background:"none",border:"none",color: "#11324D"}} onClick={handlePopup}>
                                <AddCircleOutlineIcon style={{ marginRight: "15px", fontSize: "xx-large" }}></AddCircleOutlineIcon>
                            </button>
                            </div>
                        </PaymentsInfo>

                        <PaymentsInfo style={{ margin: '0px 5%' }}>
                            <Paragraph>Balance</Paragraph>
                            <Paragraph>{user.user.totalBalance}
                            1900000 S.P</Paragraph>
                        
                        </PaymentsInfo>

                        <PaymentsInfo>
                            <Paragraph>
                            Total Payments
                            </Paragraph>
                            <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                            <Paragraph>{user.user.totalPayments}
                            100000 S.P </Paragraph>
                            
                            <Link to='/Mangment/Dashbord' style={{ marginRight: "10px",textDecoration: "none" , color: "#6b7aa1" ,fontSize:"small"}}>View All<KeyboardDoubleArrowRightIcon style={{fontSize:"small"}}/></Link>
                            </div>
                        </PaymentsInfo>

                    </PaymentsContainer>

                    <h2 style={{ color: '#11324D', marginTop: '25px' }}>
                        Insert Required Payment
                    </h2>
                    <hr style={{
                        border: '1px solid #11324D',
                        width: '80%',
                        height: '0px',
                        left: '390px',
                        marginTop:'0px'
                    }}></hr>

                    <form  id="form1" onSubmit={sendDate}>
                        <FormContainer style={{
                        display: "flex",
                        marginTop: "20px",
                        width:'75%'
                        }}>
                            <InputContainer>

                                <InputContainer>
                                <Label>payment Name</Label>
                                <Input type="text" placeholder='Name' required value={Name} onChange={(e)=>setName(e.target.value)}></Input>
                                </InputContainer>

                                <InputContainer>
                                <Label>Last date to pay</Label>
                                <Input type="date" required style={{ fontSize: '25px', color: 'gray', padding: '10px' } } value={Date} onChange={(e)=>setDate(e.target.value)}></Input>
                                </InputContainer>

                            </InputContainer>

                            <InputContainer>

                                <InputContainer>
                                <Label>payment Value</Label>
                                <Input type="number" required placeholder='Value' value={Value} onChange={(e)=>setValue(e.target.value)}></Input>
                                </InputContainer>

                                <InputContainer>
                                    <Label>payment Type</Label>
                                    <select
                                    value={Type}
                                    onChange={(e)=>setType(e.target.value)}
                                    id="cars"
                                    name="cars"
                                    style={{
                                    border:'none',
                                    borderRadius:'10px',
                                    width:'90%',
                                    backgroundColor:'rgba(208,148,148,0.21)',
                                    color: 'black',
                                    }}
                                    >
                                    <option defaultValue="OTHERS">OTHERS</option>
                                    <option defaultValue="" disabled hidden>
                                        Options
                                    </option>
                                    <option defaultValue="BANK">BANK</option>
                                    <option defaultValue="AJAR">AJAR</option>
                                    <option defaultValue="FOATER">FOATER</option>
                                    <option defaultValue="DEANS">DEANS</option>
                                   
                                    </select>
                                </InputContainer>

                            </InputContainer>

                        </FormContainer>

                        
                        <InputContainer style={{width:'60%',alignItems:'center',marginTop:'30px'}}>
                                <Label>Payment Repeater</Label>
                                <div style={{display:'flex',marginTop:'7px'}}>
                                    <label for='Yes'>Yes</label>
                                    <Radio type="radio" required name='repeater'  id='Yes' checked={Repeater===1} onChange={()=>setRepeater(1)}/>
                                    <label for='No'>No</label>
                                    <Radio type="radio" required name='repeater' id='No' checked={Repeater===0} onChange={()=>setRepeater(0)}/>
                                </div>
                        </InputContainer>
                        <Button type="submit"  style={{marginInline:'20%'}}> Insert Payment</Button>

                    </form>


                </Content>
                
            </InnerContainer>
        </Container>
    );
}

export default InsertRequiredPayment; 