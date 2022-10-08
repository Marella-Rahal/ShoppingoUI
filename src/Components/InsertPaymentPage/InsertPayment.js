import React, { useState ,useEffect} from 'react';
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import axios from 'axios';
import {
  Container,
  TopNavbar,
  Content,
  Label,
  InnerContainer,
} from '../AddProduct/Home/AddProductCss';
import  HeaderImage  from '../Profile/HeaderImage';
import {
  PaymentsContainer,
  PaymentsInfo,
  Paragraph,
  Input,
  InputContainer,
  Button,
  FormContainer,
} from './InsertPaymentcss';
import { IconButton } from '@mui/material';
import { Route, Link, useNavigate } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import IncomePopup from '../PopUp/IncomePopup';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/Slices/UserSlice';
import NotePopup, { showPopupNote } from '../PopUp/NotePopup';

function InsertP(props) {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState('');

  const route = useNavigate();
  const  user= useSelector((state) => state.user);
  const token=localStorage.getItem("userToken");
  const [PaymentName, setPaymentName] = useState('');
  const [PaymentValue, setPaymentValue] = useState('');
  const [PaymentDate, setPaymentDate] = useState('');
  const [PaymentType, setPaymentType] = useState('Others');
  // console.log(PaymentName,typeof(PaymentName));
  // console.log(PaymentValue,typeof(PaymentValue));
  // console.log(PaymentDate,typeof(PaymentDate));
  // console.log(PaymentType,typeof(PaymentType));

  const [image,setImage]=useState();
  useEffect(()=>{
    
    if(user.user.imageUrl.length>1){
      setImage(`http://localhost:5000/${user.user.imageUrl}`);
    }
    else{
      setImage(require('../../Images/Default.jpg'));
    }
  })

  const handlePopup = (e) => {
    e.preventDefault();
    $('.popupdiv').fadeTo(700, 1);
    $('.fullscreen').fadeTo(700, 1);
    $('body').css('overflow', 'hidden');
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {

      const res=await axios.post(
        'http://localhost:5000/managment/addpayment',
        {
          name: PaymentName,
          value: PaymentValue,
          date: PaymentDate,
          type: PaymentType,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )  

      dispatch(registerUser(res.data));
      route('/Mangment/Payments');

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

  };

  return (
    <Container>
      <NotePopup msg={errMsg} color="red" />

      <IncomePopup title="Please Insert Your Income Value" />
      <SideNavbar />
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
              <IconButton
                onClick={() => {
                  Route('/Favourite');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <Favorite />
              </IconButton>
            </Link>
            <Link to="/ShoppingCard">
              <IconButton
                onClick={() => {
                  Route('/ShoppingCard');
                }}
                style={{ color: '#6B7AA1' }}
              >
                <AddShoppingCart />
              </IconButton>
            </Link>

            <div style={{ marginTop: '10px', fontSize: '15px' }}>
              Hello , user 
              {user.user.name}
            </div>
            <HeaderImage
              image={image}
              
            ></HeaderImage>
          </div>
        </TopNavbar>

        <Content style={{ flexDirection: 'column' }}>
          <PaymentsContainer>
            <PaymentsInfo>
              <Paragraph>Total income</Paragraph>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Paragraph>{user.user.income} 
                2000000 S.P</Paragraph>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#11324D',
                  }}
                  onClick={handlePopup}
                >
                  <AddCircleOutlineIcon
                    style={{ marginRight: '15px', fontSize: 'xx-large' }}
                  ></AddCircleOutlineIcon>
                </button>
              </div>
            </PaymentsInfo>
            <PaymentsInfo style={{ margin: '0px 5%' }}>
              <Paragraph>Balance</Paragraph>
              <Paragraph>{user.user.totalBalance}
              1900000 S.P</Paragraph>
            </PaymentsInfo>

            <PaymentsInfo>
              <Paragraph>Total Payments</Paragraph>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Paragraph>{user.user.totalPayments}
                100000 S.P </Paragraph>

                <Link
                  to="/Mangment/Dashbord"
                  style={{
                    marginRight: '10px',
                    textDecoration: 'none',
                    color: '#6b7aa1',
                    fontSize: 'small',
                  }}
                >
                  View All
                  <KeyboardDoubleArrowRightIcon style={{ fontSize: 'small' }} />
                </Link>
              </div>
            </PaymentsInfo>
          </PaymentsContainer>

          <h2 style={{ color: '#11324D', marginTop: '25px' }}>
            Insert Payment
          </h2>
          <hr
            style={{
              border: '1px solid #11324D',
              width: '80%',
              height: '0px',
              left: '390px',
              marginTop: '0px',
            }}
          ></hr>

          <form onSubmit={sendData} id="form1">
            <FormContainer
              style={{
                display: 'flex',
                marginTop: '20px',
              }}
            >
              <InputContainer style={{ alignItems: 'end' }}>
                <InputContainer>
                  <Label>payment Name</Label>
                  <Input
                    type="text"
                    placeholder="Mashaoui"
                    onChange={(e) => setPaymentName(e.target.value)}
                    required
                  ></Input>
                </InputContainer>
                <InputContainer>
                  <Label>payment Date</Label>
                  <Input
                    type="date"
                    style={{ fontSize: '25px', color: 'gray', padding: '10px' }}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                  ></Input>
                </InputContainer>
              </InputContainer>
              <InputContainer>
                <InputContainer>
                  <Label>payment Value</Label>
                  <Input
                    type="number"
                    placeholder="200000"
                    onChange={(e) => setPaymentValue(e.target.value)}
                    required
                  ></Input>
                </InputContainer>
                <InputContainer>
                  <Label>payment Type</Label>
                  <select
                    id="cars"
                    name="cars"
                    style={{
                      border: 'none',
                      borderRadius: '10px',
                      width: '90%',
                      backgroundColor: 'rgba(208,148,148,0.21)',
                      color: 'black',
                    }}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option Value="" disabled hidden>
                      Options
                    </option>
                    <option Value="others">Others</option>
                    <option Value="food">Food</option>
                    <option Value="clothes">clothes</option>
                    <option Value="schoolCost">School Cost</option>
                    <option Value="transporation">
                      Transportation
                    </option>
                    <option Value="healthInsurunce">
                      Health insurance
                    </option>
                    <option Value="entertainment">Entertainment</option>
                  </select>
                </InputContainer>
              </InputContainer>
            </FormContainer>
            <Button type="submit" form="form1" value="Submit" style={{marginLeft: "75%"}}>
              Insert Payment
            </Button>
          </form>
        </Content>
      </InnerContainer>
    </Container>
  );
}
export default InsertP;
