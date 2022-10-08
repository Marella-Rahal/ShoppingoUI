import React,{useEffect, useRef, useState} from 'react';
import './Productdetailbody.css';
import Navbar from '../../Home/Navbar/Navbar';
import { AddShoppingCart, ArrowForward } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Colors from './Colors/Colors';
import Sizes from './Sizes/Sizes';
import Details from './Details';
import Map from '../Map/Mapbody/Map';
import { useNavigate, useParams } from 'react-router';
import NotePopup, { showPopupNote } from '../../PopUp/NotePopup';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { displayProduct } from '../../../Redux/Slices/ProductDetailSlice';
import j from '../../../Images/Background.jpg';


let coordsG={lat:0,lng:0};

function Productdetailbody(props) {

    const {id}=useParams();
    const route=useNavigate();
    const token=localStorage.getItem('userToken');
    const dispatch=useDispatch();
    const product=useSelector(state=>state.productDetail.product);

    const description=useRef();
    const color=useRef();
    const size=useRef();
    const price_loc=useRef();

    const [coords,setCoords]=useState({lat:0,lng:0});
    const [errMsg,setErrMsg]=useState();
    const [image,setImage]=useState(require('../../../Images/defaultProduct.jfif'));

    const [colors,setColors]=useState([]);
    const [sizes,setSizes]=useState([]);


    useEffect(()=>{

        //!  *** todo on mount***

        let isRequested=false;

        //************************ user location ************************/

        if( (Object.keys(product).length==0) || ( (Object.keys(product).length) && (id!=product.id) )){

            navigator.geolocation.getCurrentPosition((pos)=>{

                //!  ***todo check if it is not unmounted yet***
    
                if(!isRequested){
                    coordsG={lat:pos.coords.latitude,lng:pos.coords.longitude};
                    setCoords({lat:pos.coords.latitude,lng:pos.coords.longitude});
                    setErrMsg(<h4>Your location has been successfully sent to us</h4>);
                    showPopupNote();
                }
    
    
    
                // ********* display product **********/ 
    
                axios.post( `http://localhost:5000/shop/displayProduct/${id}` ,
                            {
                                lat:coords.lat,
                                log:coords.lng
                            },
                            {
                                headers:{
                                authorization :`bearer ${token}`
                                }
                            }
                ).then(res=>{
    
                    //!  ***todo check if it is not unmounted yet***
                    if(!isRequested){

                        console.log(res.data)
                        //todo ***************************
                        dispatch(displayProduct(res.data));
                    }
                    
    
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
          
                //************ display product *****************/
    
            },(err)=>{
                const {code} = err;
           
                switch (code) {
                    case err.TIMEOUT:
                        setErrMsg(<h4>We Failed to get your location:<br/>Timeout expired</h4>);
                        showPopupNote();
                        break;
                    case err.PERMISSION_DENIED:
                        setErrMsg(<h4>We Failed to get your location:<br/>Permission denied</h4>);
                        showPopupNote();
                    case err.POSITION_UNAVAILABLE:
                        setErrMsg(<h4>We Failed to get your location:<br/>Position unavailable</h4>);
                        showPopupNote();    
                    default:
                        setErrMsg(<h4>We Failed to get your Location</h4>);
                        showPopupNote();
                        break;
                }
          
            },{
                enableHighAccuracy:true,
                timeout:30000,
                maximumAge:15000
            });

        }

        //************************ user location *******************************/

        //!  ***todo on unmount***
        return ()=>{
            isRequested=true;
        }

    },[])


    //******** set product image **********/

    useEffect(()=>{

        if( (Object.keys(product).length)&&(id==product.id)){

            setImage(`http://localhost:5000/${product.image}`);

        }
    
    })
    

    //*********** add to cart ************/

    const addToCart=(e)=>{

        e.preventDefault();

        axios.post('http://localhost:5000/cart/addItemToCart',
                   {

                        cartItems:[{
                            product:product.id,
                            quantity:1,
                            price:product.new,
                            colors:colors,
                            sizes:sizes,
                            sellerId:product.sellerId,
                            name:product.name

                        }]

                   },
                   {
                        headers :{
                            authorization : `bearer ${token}`
                        }
                   }         
        ).then(res=>{

            route('/ShoppingCard');

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

    //************************************/

    return (
        <>
            <NotePopup msg={errMsg} color={"red"}/>
            <Navbar/>
            <div className='detail'>

                <form onSubmit={addToCart} className='product-detail'>

                     {/* //todo: The Image And the Add button  */}

                    <div style={{margin:'20px',marginTop:'0px',color:'#0E1D51',fontWeight:'bold',display:'flex'}}>

                        <img 
                        // src={image}
                        src={j}
                         alt="product img" style={{width:'60%',height:'100%',borderRadius:'30px'}}/>

                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-evenly'}}>
                            <button type='submit' className='add-shoppingcard'>Add to <AddShoppingCart/></button>

                        </div>

                    </div>

                    {/* //todo: Description and the Arrow button and the content */}

                    <Details name="Description" content={description}/>

                    <p ref={description} style={{color:'#6B7AA1',fontWeight:'bold',marginInline:'20px'}}>
                        { (Object.keys(product).length)&&(id==product.id)?product.description
                        // :"Loading ..."
                        :"Cotton Black Shirt"
                        }
                    </p>

                    {/* //todo: Colors and the Arrow button and the content   */}

                    <Details name="Colors" content={color}/>

                    <div ref={color} style={{marginInline:'20px'}}>

                     <Colors color="red"  setColors={setColors}/>
                     <Colors color="blue"  setColors={setColors}/>
                     <Colors color="pink"  setColors={setColors}/>
                     <Colors color="Yellow"  setColors={setColors}/>
                        
                        {

                                (Object.keys(product).length)&&(id==product.id)?
                                            
                                    (product.colors).map((one,index)=>{

                                        return <Colors  key={index} color={one}  setColors={setColors}/>

                                    })

                                // :<h6 style={{color:'#6B7AA1',fontWeight:'bold'}}>Loading ...</h6>
                                :""
                        }

                    </div>

                    {/* //todo: Sizes and the Arrow button and the content */}

                    <Details name="Sizes" content={size}/>

                   
                    <div ref={size} style={{marginInline:'20px',color:'#0E1D51'}}> 
                    <Sizes  size='m' setSizes={setSizes}/>
                    <Sizes  size='l' setSizes={setSizes}/>
                    <Sizes  size='xl' setSizes={setSizes}/>
                    <Sizes  size='xxl' setSizes={setSizes}/>

                        {   
                             (Object.keys(product).length)&&(id==product.id)?
                                (product.sizes).map((one,index)=>{

                                    return <Sizes  key={index} size={one} setSizes={setSizes}/>

                                }):""
                                // <h6 style={{color:'#6B7AA1',fontWeight:'bold'}}>Loading ...</h6>
                        }

                    </div>


                    {/* //todo: Price and Location and the Arrow button and the content */}

                    <Details name="Price and Location" content={price_loc}/>

                    <div ref={price_loc} style={{marginInline:'20px',color:'#6B7AA1',fontWeight:'bold'}}>

                        <h6 style={{color:'#6B7AA1',fontWeight:'bold'}}>
                            { (Object.keys(product).length)&&(id==product.id)?product.name
                            // :"Loading ..."
                            :"For_You"
                            }    
                        </h6>

                        <div style={{display:'flex',flexWrap:'wrap',maxWidth:'340px',height:'fit-content'}}>
                                <h6 style={{textDecoration:'line-through',color:'red',marginRight:'15px'}}>
                                    30000 s.p
                                </h6>
                                <h6>
                                    20000 s.p
                                </h6>
                        </div>

                        {
                           
                             (Object.keys(product).length)&&(id==product.id)?
                                (
                                    product.old!==product.new?
                                    <div style={{display:'flex',flexWrap:'wrap',maxWidth:'340px',height:'fit-content'}}>
                                        <h6 style={{textDecoration:'line-through',color:'red',marginRight:'15px'}}>
                                            {product.old} s.p
                                        </h6>
                                        <h6>
                                            {product.new} s.p
                                        </h6>
                                    </div>:

                                    <div style={{maxWidth:'340px',height:'fit-content'}}>{product.old} s.p</div>
                                ):""

                        }


                        {/* <div style={{textAlign:'right',maxWidth:'340px',height:'fit-content'}}
                        >
                            شارع الحضارة بجانب مركز سيرياتيل
                       
                        </div> */}


                        <IconButton className='arrowforward'>
                            <ArrowForward/>
                        </IconButton>
                        
                    </div>

                </form>

                <Map coords={coordsG}/>
                {/* {
                    
                    (Object.keys(product).length)&&(id==product.id)?

                    <Map coords={coordsG}/>:

                    <div style={{width:'64%',minHeight:'50vh',color:'#0E1D51',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'25px',boxShadow:'5px 5px 20px 10px rgba(0,0,0,0.25)'}}>
                        <h3>Map Is Loading ...</h3>
                    </div>

                } */}
                                
                
            </div>

        </>
    );
}

export default Productdetailbody;

