import React ,{useState,useEffect}from 'react'
import SideNavbar from '../AddProduct/SideNavbar/SideNavbar';
import { AddShoppingCart, Favorite, LocalDining } from '@mui/icons-material';
import BarChart2 from './BarChart';
import PieChart2 from './PieChart';
import { Route, Link, useNavigate } from 'react-router-dom';
import {
  TopNavbar,
  Content,
 
} from '../AddProduct/Home/AddProductCss';
import {
  Container,
} from '../Profile/ProfileInfoCss';
import HeaderImage from '../Profile/HeaderImage';
import { IconButton } from '@mui/material';
import{Lsection,TlSection,ParentSection,Span,Button,InnerContainer,Bsection,BsectionContent,MiddleSection,MiddleSectionContent,PaymentInfo,RightSection,ColorDiv,ColorButton,ColorContainer} from'./DashboardCss';
import { PaymentsContainer, PaymentsInfo, Paragraph, Input, InputContainer, FormContainer } from '../InsertPaymentPage/InsertPaymentcss';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import IncomePopup from '../PopUp/IncomePopup';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import NotePopup, { showPopupNote } from '../../PopUp/NotePopup';


function Dashboard() {

  const infocirclechar={
    "food": 50,
    "clothes": 50,
    "transporation": 50,
    "schoolCost": 50,
    "healthInsurunce": 50,
    "entertainment": 50,
    "others": 50,
    "Health insurance": 50,
    "Transportation": 50
}

const defaultbarchar={
  "0": 500,
  "1": 500,
  "2": 500,
  "3": 500,
  "4": 500,
  "5": 500,
  "6": 500,
  "7": 500,
  "8": 500,
  "9": 500,
  "10": 500,
  "11": 500,
  "year": 2022
}

  const route = useNavigate();
  const user=useSelector(state=>state.user);
  const [image,setImage]=useState();
  const token=localStorage.getItem('userToken');
  const[income,setIncome]=useState();
  const[totalBalance,settotalBalance]=useState();
  const[totalPayments,settotalPayments]=useState();
  const[InformationCircleChar,setInformationCircleChar]=useState(); 
  const [errMsg,setErrMsg]=useState('');
  const[alldata,setalldata]=useState();
  const[Payment,setPayment]=useState();
  const[reqpayment,setreqpayment]=useState();
  const [barcharinfo,setbarcharinfo]=useState();
  const userInfo=useSelector(state=>state.user.user);

  useEffect(()=>{

    if(user.user.imageUrl.length>1){
      setImage(`http://localhost:5000/${user.user.imageUrl}`);
    }
    else{
      setImage(require('../../Images/Default.jpg'));
    }

  })
  
  useEffect(()=>{

      axios.get(
        'http://localhost:5000/managment/getdatadashboard',
          {
            headers:{
                authorization : `Bearer ${token}`
            }
        }
      ).then(res=>{
        setalldata(res.data);
        setIncome(res.data["dash"]["0"]["income"]);
        settotalBalance(res.data["dash"]["0"]["totalBalance"])
        settotalPayments(res.data["dash"]["0"]["totalPayments"])
        setInformationCircleChar(res.data["dash"]["1"]);
        setPayment(res.data["dash"]["2"])
        setreqpayment(res.data["dash"]["3"])
        setbarcharinfo(res.data["yearandmonths"])
        console.log(res.data["yearandmonths"])
        
      }).catch (err=> {
          console.log(err)

      })
  },[])
 
  const handlePopup=(e)=>{
    e.preventDefault();
    $(".popupdiv").fadeTo(700,1);
    $(".fullscreen").fadeTo(700,1);
    $('body').css("overflow","hidden");
  }

  return (
    <Container>
    <IncomePopup title="Please Insert Your Income Value"/>
    <SideNavbar />
    <InnerContainer>
      <TopNavbar style={{justifyContent: "end"}}>
       
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

          <div style={{ marginTop: '7px', fontSize: '15px' }}>
            Hello , user 
            {/* {user.user.name} */}
          </div>


          <HeaderImage image={image}  />


        </div>
      </TopNavbar>
      <Content style={{ marginTop: '15px' , flexDirection:"column"}}>
      <PaymentsContainer style={{marginBottom:"30PX"}}>
            <PaymentsInfo>

              <Paragraph>Total income</Paragraph>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                <Paragraph> {userInfo.income}
                2000000 S.Y.P</Paragraph>
                <button style={{background:"none",border:"none",color: "#11324D"}} onClick={handlePopup}>
                  <AddCircleOutlineIcon style={{ marginRight: "15px", fontSize: "xx-large" }}></AddCircleOutlineIcon>
                </button>
              </div>
            </PaymentsInfo>
            <PaymentsInfo style={{ margin: '0px 5%' }}>
              <Paragraph>Balance</Paragraph>
              <Paragraph>
              
                {/* {userInfo.totalBalance} */}
                1900000  S.Y.P</Paragraph>
            
            </PaymentsInfo>

            <PaymentsInfo>
              <Paragraph>
                Total Payments
              </Paragraph>
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
              <Paragraph>{userInfo.totalPayments}
              100000 S.Y.P </Paragraph>
              
              {/* <Link to='#'style={{ marginRight: "10px",textDecoration: "none" , color: "#6b7aa1" ,fontSize:"small"}} onClick={()=>{route('#')}}>View All<KeyboardDoubleArrowRightIcon style={{fontSize:"small"}}/></Link> */}
              </div> 
            </PaymentsInfo>

          </PaymentsContainer>
            <ParentSection>
              <Lsection>
                  <TlSection style={{paddingTop:"10px"}}>
                    <Span>
                      Payment Required
                    </Span>
                    <Button onClick={()=>{route('/Mangment/InsertRequiredPayments')}}>Insert New Payment</Button>              
                  </TlSection>



                  <Bsection>
                    <BsectionContent>
                      <span>
                          Loan
                      </span>
                      <span>
                          Until 
                      </span>
                    </BsectionContent>
                    <BsectionContent>
                      <span>
                          1000000 SYP
                      </span>
                      <span>
                          21-3-2025
                      </span>
                    </BsectionContent>
                  </Bsection>




                  {reqpayment?reqpayment.map((props,index)=>{
                    return(
                  <Bsection>
                    <BsectionContent>
                      <span>
                          {props["type"]}
                      </span>
                      <span>
                          Until 
                      </span>
                    </BsectionContent>
                    <BsectionContent>
                      <span>
                          {props["value"]} SYP
                      </span>
                      <span>
                          {props["date"]} 
                      </span>
                    </BsectionContent>
                  </Bsection>)})
                  :""
                  // :"Loading..."
                }
                 
                    <Link to='/Mangment/RequiredPayments'style={{ marginRight: "10px",textDecoration: "none" , color: "#6b7aa1" ,fontSize:"larger"}}>View All<KeyboardDoubleArrowRightIcon style={{fontSize:"small"}}/></Link>
              </Lsection>
              <MiddleSection>
                <MiddleSectionContent>
              <TlSection style={{padding:" 0px 10px"}}>
                    <Span>
                      Payments
                    </Span>
                    <Button onClick={()=>{route('/Mangment/InsertPayments')}}>Insert New Payment</Button>              
                  </TlSection>


                  <PaymentInfo>
                      <div>
                        <CreditCardIcon  style={{color: "#11324D",marginRight: "5px",marginBottom: "3px"}}/>
                        <span style={{color: "#11324D"}}>Trip</span>
                      </div>
                       <span style={{color: " #6B7AA1"}}>100000 SYP</span>
                   </PaymentInfo>




                  {Payment?
                   Payment.map((props,index)=>{
                    return(
                    <PaymentInfo>
                      <div>
                        <CreditCardIcon  style={{color: "#11324D",marginRight: "5px",marginBottom: "3px"}}/>
                        <span style={{color: "#11324D"}}>{props["name"]}</span>
                      </div>
                       <span style={{color: " #6B7AA1"}}>{props["value"]} SYP</span>
                   </PaymentInfo>
                   )}):""
                  // :"Loading..."
                  }


                  </MiddleSectionContent>
                  <Link to='/Mangment/Payments'style={{ marginRight: "10px",textDecoration: "none" ,     marginTop: "10px",color: "#6b7aa1" ,fontSize:"larger"}}>View All<KeyboardDoubleArrowRightIcon style={{fontSize:"small"}}/></Link>
              </MiddleSection>
              <RightSection className="PieCHART">
               {InformationCircleChar?<PieChart2 style={{width:"100% !important"}} InformationCircleChar={InformationCircleChar}/>:<PieChart2 style={{width:"100% !important"}} InformationCircleChar={infocirclechar}/>}  
               <ColorContainer>
                            <ColorDiv>
                                <div style={{display:"flex"}}>
                                  <ColorButton style={{backgroundColor:"aqua"}}/>
                                  <p>
                                      Food
                                  </p>
                                </div>
                                <div style={{display:"flex"}}>
                                  <ColorButton style={{backgroundColor:"#86E3CE"}}/>
                                  <p>
                                    Clothes
                                  </p>
                                </div>
                                <div style={{display:"flex"}}>
                                  <ColorButton style={{backgroundColor:"#D0E6A5"}}/>
                                  <p>
                                    Transport
                                  </p>
                                </div>
                            </ColorDiv>
                            <ColorDiv>
                              <div style={{display:"flex"}}>
                                <ColorButton style={{backgroundColor:"#FFDD94"}}/>
                                <p>
                                 School Cost
                                </p>
                                </div>
                              <div style={{display:"flex"}}>
                                <ColorButton style={{backgroundColor:"#FA897B"}}/>
                                <p>
                                  Health Inserunce
                                </p>
                              </div>
                              <div style={{display:"flex"}}>
                                <ColorButton style={{backgroundColor:"#CCABD8"}}/>
                                <p>
                                  Entertainment
                                </p>
                              </div>
                            </ColorDiv>
                            <div style={{display:"flex"}}>
                              <ColorButton style={{backgroundColor:"grey"}}/>
                              <p>
                               Others
                              </p>
                              </div>
               </ColorContainer>

               </RightSection>
            </ParentSection>
              <div style={{marginTop:"20px"}} >
                {barcharinfo? <BarChart2 barcharinfo={barcharinfo} /> : <BarChart2 barcharinfo={defaultbarchar}/>}
              </div> 
      </Content>
      </InnerContainer>
      </Container>

  )
}

export default Dashboard;