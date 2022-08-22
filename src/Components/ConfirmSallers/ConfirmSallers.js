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
import './ConfirmSaller.css';
import IncomePopup from '../PopUp/IncomePopup';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


let Boolen1="false";
let Boolen2="true";

function ConfirmSallers(props){
    const route=useNavigate();
    const user=useSelector(state=>state.user.user);
    const req=useSelector(state=>state.payReq.paymentReq);
    // const necessary=useSelector(state=>state.payReq.message);
    const token=localStorage.getItem('userToken');
    const dispatch=useDispatch();
    const [SallerInfo,setSallerInfo]=useState();
    console.log(typeof SallerInfo ,SallerInfo)
    
   

    useEffect(()=>{

        axios.get(
          'http://localhost:5000/auth/admin/getAllSeller',
          
            {
              headers:{
                  authorization : `Bearer ${token}`
              }
          }
        ).then(res=>{
            setSallerInfo(res.data)
          
        }).catch (err=> {

           console.log(err)
          

        })
    },[])
    
    function AdminDes(Email,Boolen)
    {
        axios.post(
            `http://localhost:5000/auth/admin/${Email}/${Boolen}`,
             {hello:"hello"} 
            ,
            {
                headers:{
                    authorization : `Bearer ${token}`
                }
            }
          ).then(res=>{
              console.log(res.data)
              window.location.reload(false);

              

            
          }).catch (err=> {
  
             console.log(err)
            
  
          })

    }

    return(
        <Container>
          
            <SideNavbar/>
            <InnerContainer>
           
                <Content style={{ flexDirection: 'column' }} >
                   { (SallerInfo)? SallerInfo.map((props,index)=>{return(              
                     <div key={index} style={{width:'95%',minHeight:'100px',lineHeight:'40px',borderRadius:'20px',padding:'10px',marginTop:'20px',marginBottom:'20px',marginRight:'15px',display:'flex',justifyContent: 'space-between',boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.25)'}}>

                        
                    <div style={{height:'100%',display:'flex'}}>

                        <span style={{color:'#11324D',fontSize: '35px'}}>
                            Email : {props.emailShop}

                        </span>
                        
                    </div>

                    <div >
                    <button onClick={()=>{AdminDes(props.emailShop,Boolen1)}} type='button' className='btn-insert' style={{width:'100px',marginRight:'25px',borderRadius:'10px'}} > Delete</button>
                    <button onClick={()=>{AdminDes(props.emailShop,Boolen2)}} type='button' className='btn-insert' style={{width:'100px',borderRadius:'10px'}}> Accept</button>
                    </div>



                    </div>
                 )} )

                    :<>"Loading"</>}



                  
                </Content>

            </InnerContainer>

        </Container>            
    );
}

export default ConfirmSallers;