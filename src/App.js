import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Homebody from './Components/Home/Homebody/Homebody';
import NotFound from './Components/NotFound/NotFound';
import Offersbody from './Components/Offers/Offersbody/Offersbody';
import Favourite from './Components/Favourite/Favourite';
import ShoppinCardbody from './Components/ShoppingCard/ShoppingCardbody/Shoppingcardbody';
import Shopbody from './Components/Shop/Shopbody/Shopbody';
import LogIn from './Components/LogIn/LogIn';
import SignUp from './Components/SignUp/SignUP';
import Productdetailbody from './Components/ProductDetail/ProductDetailbody/Productdetailbody';
import AddProduct from './Components/AddProduct/Home/AddProduct';
import Profile from './Components/Profile/ProfileInfo';
import InsertP from './Components/InsertPaymentPage/InsertPayment';
import InsertRequiredPayment from './Components/InsertRequiredPayment/InsertRequiredPayment';
import RequiredPayment from './Components/RequiredPayment/RequiredPayment';
import Payment from './Components/Payment/Payment';
import Dashboard from './Components/Dashboard/Dashboard';
import UpgradeProfile from './Components/UpgradeProfile/UpgradeProfile';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SellerDashboard from './Components/SallerDashboard/SallerDashboard/SallerDashboard';
import Error from './Components/Error/Error';
import GetUserData from './Components/GetData/GetUserData';
import GetHomeData from './Components/GetData/GetHomeData';
import GetPaymentData from './Components/GetData/GetPaymentData';
import GetPaymentReqData from './Components/GetData/GetPaymentReqData';
import ConfirmSallers from './Components/ConfirmSallers/ConfirmSallers';

function App(props) {

  return (
    <BrowserRouter>
           <Routes>


                {/* <Route element={<GetHomeData/>}> */}
                  <Route path='/' element={<Homebody/>}/>
                  <Route path='/Shop' element={<Shopbody/>}/>
                  <Route path='/Offers' element={<Offersbody/>}/>
                {/* </Route>  */}



                {/* <Route element={<GetUserData/>}> */}

                  <Route path="/Profile" element={<Profile/>}/>

                  //todo user and admin
                  <Route path='/UpgradeProfile' element={<UpgradeProfile/>}/>

                  <Route path="/Mangment/InsertPayments" element={<InsertP/>}/>

                  <Route path="/Mangment/InsertRequiredPayments" element={<InsertRequiredPayment/>}/>

                  <Route path="/ProductDetail/:id" element={<Productdetailbody/>}/>

                  <Route path="/Mangment/Dashbord" element={<Dashboard/>}/>

                  <Route path='/ShoppingCard' element={<ShoppinCardbody/>}/> 

                  //todo seller and admin
                  <Route path="/AddProduct" element={<AddProduct/>}/>

                  <Route path="/Mangment/SellerDashboard" element={<SellerDashboard/>}/>

                  //todo admin
                  <Route path="/ConfirmSallers" element={<ConfirmSallers/>}/>
                  
                {/* </Route> */}



                {/* <Route element={<GetPaymentData/>}> */}
                  <Route path="/Mangment/Payments" element={<Payment/>}/>
                {/* </Route> */}



                {/* <Route element={<GetPaymentReqData/>}> */}
                  <Route path="/Mangment/RequiredPayments" element={<RequiredPayment/>}/>
                {/* </Route> */}


                <Route path='/LogIn' element={<LogIn/>}/>

                <Route path='/SignUp' element={<SignUp/>}/>

                <Route path='/ResetPassword' element={<ResetPassword/>}/>




                <Route path='/Favourite' element={<Favourite/>}/>          




                <Route path='/Error' element={<Error/>}/>

                <Route path='*' element={<NotFound/>} />

           </Routes>

    </BrowserRouter>
  );
}

export default App;