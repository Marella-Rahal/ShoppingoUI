import { configureStore } from "@reduxjs/toolkit";
import PaymentSlice from "./Slices/PaymentSlice";
import  UserSlice from "./Slices/UserSlice";
import PaymentReqSlice from "./Slices/PaymentReqSlice";
import SellerSlice from "./Slices/SellerSlice";
import ProductDetailSlice from "./Slices/ProductDetailSlice";


export  const Store=configureStore({
    reducer:{
        user:UserSlice,
        seller:SellerSlice,
        pay:PaymentSlice,
        payReq:PaymentReqSlice,
        productDetail:ProductDetailSlice
    }
});