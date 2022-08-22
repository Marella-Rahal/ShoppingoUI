import React, { useEffect, useState } from 'react';
import Navbar from '../../Home/Navbar/Navbar';
import ProductCard from '../ProductCard/ProductCard';
// import Classificationbar from '../Classificationbar/Classificationbar';
// import Sortbutton from '../Sortbutton/Sortbutton';
import './Shopbody.css';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { RestoreFromTrashOutlined, Sort } from '@mui/icons-material';
import $ from 'jquery';
import SleepingPopup from '../../PopUp/SleepingPopup';
// import useForceUpdate from 'use-force-update';
// import InputItem from '../Classificationbar/InputItem';



function Shopbody(props) {
    
   
    const [manChecked,setmanChecked]=useState(true);
    const [womanChecked,setwomanChecked]=useState(false);


    const mantoggle=(e)=>{
        GenderSort("man");
        setmanChecked(true);
        setwomanChecked(false);
        $('#Sman').css('display','block');
        $('#Swoman').css('display','none');
        $('.product').css('marginTop','-750px')
        $('.back').css('minHeight','140vh')
    }
  
    const womantoggle=(e)=>{
        GenderSort("woman");
        setmanChecked(false);
        setwomanChecked(true);
        $('#Sman').css('display','none');
        $('#Swoman').css('display','block');
        $('.product').css('marginTop','-850px');
        $('.back').css('minHeight','155vh');
    }


    const user=useSelector(state=>state.user);

    const token=localStorage.getItem('userToken');
    const [offer,setOffer]=useState([]);
    const [noOffer,setNoOffer]=useState([]);
    const[LowToHigh2,setLowToHigh2]=useState([]);
    const[HighToLow2,setHighToLow2]=useState([]);
    const[From,setFrom]=useState();
    const[To,setTo]=useState();
    const[FromTo2,setFromTo2]=useState([]);
    const[categOffer2,setcategOffer2]=useState([]);
    const[categNoOffer2,setcategNoOffer2]=useState([]);
    const[GenderSortOffer2,setGenderSortOffer2]=useState([]);
    const[GenderSortNoOffer2,setGenderSortNoOffer2]=useState([]);
    

    // console.log(categ)
    // console.log(From)
    

    useEffect(()=>{
       

        axios.get('http://localhost:5000/shop/getProducts',
                 {
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                 }
        ).then(res=>{
            // console.log(res.data);
            setOffer(res.data.Offers);
            setNoOffer(res.data.noOffers);
        }).catch(err=>{
            console.log(err);
        })
      
        
    },[])

    function LowToHigh(){
        setOffer([]);
        setNoOffer([]);
        setHighToLow2([]);
        setFromTo2([]);
         setOffer([]);
         setGenderSortOffer2([])
         setGenderSortNoOffer2([])
    setcategOffer2([]);
    setcategNoOffer2([]);

        axios.post('http://localhost:5000/shop/ProductFilter',
        {typeOfFilter:"LOW"},
        {
           headers:{
               authorization:`Bearer ${token}`
           }
        }
        ).then(res=>{
        // console.log(res.data)
        setLowToHigh2(res.data);
        // console.log(res.data);
        // setOffer(res.data.Offers);
        // setNoOffer(res.data.noOffers);
        }).catch(err=>{
        console.log(err);
        })

    }
   function HighToLow(){
    setOffer([]);
    setNoOffer([]);
    setLowToHigh2([]);
    setFromTo2([]);
    setcategOffer2([]);
    setcategNoOffer2([]);
    setGenderSortOffer2([])
    setGenderSortNoOffer2([])
    axios.post('http://localhost:5000/shop/ProductFilter',
    {typeOfFilter:"HIGH"},
    {
       headers:{
           authorization:`Bearer ${token}`
       }
    }
    ).then(res=>{
    // console.log(res.data)
    setHighToLow2(res.data);
    // console.log(res.data);
    // setOffer(res.data.Offers);
    // setNoOffer(res.data.noOffers);
    }).catch(err=>{
    console.log(err);
    })
   }


   function FromTo(){

    setOffer([]);
    setNoOffer([]);
    setLowToHigh2([]);
    setHighToLow2([]);
    setcategOffer2([]);
    setcategNoOffer2([]);
    setGenderSortOffer2([])
    setGenderSortNoOffer2([])
    axios.post('http://localhost:5000/shop/ProductFilter',
    {from:From,
      to:To  
    },
    {
       headers:{
           authorization:`Bearer ${token}`
       }
    }
    ).then(res=>{
    // console.log(res.data)
    setFromTo2(res.data);
    // console.log(res.data);
    // setOffer(res.data.Offers);
    // setNoOffer(res.data.noOffers);
    }).catch(err=>{
    console.log(err);
    })

   }

   function sendCateg(categ,gender)
   { 
    setOffer([]);
    setNoOffer([]);
    setLowToHigh2([]);
    setHighToLow2([]);
    setFromTo2([]);
    setGenderSortOffer2([]);
    setGenderSortNoOffer2([]);
    
    axios.post('http://localhost:5000/shop/getCategoriesProduct',
    {
        categ:categ,
        gender:gender,

    }
    ,
    {
            headers:{
                authorization:`Bearer ${token}`
            }
            }
        ).then(res=>{
        console.log(res.data)
         setcategOffer2(res.data.Offers)
        //  console.log(categOffer2)
         setcategNoOffer2(res.data["noOffers"])
        // console.log(categ2)
        }).catch(err=>{
        console.log(err);
        })



   }
   function GenderSort(gender)
   {

    setOffer([]);
    setNoOffer([]);
    setLowToHigh2([]);
    setHighToLow2([]);
    setFromTo2([]);
    setcategOffer2([]);
    setcategNoOffer2([]);


    axios.post('http://localhost:5000/shop/getCategoriesProduct',
    {
        
        gender:gender

    }
    ,
    {
            headers:{
                authorization:`Bearer ${token}`
            }
            }
        ).then(res=>{
        console.log(res.data)
        setGenderSortOffer2(res.data.Offers)
        setGenderSortNoOffer2(res.data.noOffers)
        }).catch(err=>{
        console.log(err);
        })



   }
    return (
        <div className='back'>
            <SleepingPopup msg="For Future Development" color="red"/>

            <Navbar/> 

            <div>

              <h1 style={{textAlign:'center' , color:'#0E1D51',paddingBlock:'30px'}}>Our Shop</h1>

            </div>  

            <div className='dropdown'>

        <button className='dropdown-btn'>
            Sort By&nbsp;&nbsp; 
            <Sort/>
        </button>

        <div className='dropdown-content'>

            <button type='button' onClick={LowToHigh} >Price : Low To Hight</button>

            <button type='button' onClick={HighToLow}>Price : Hight To Low</button>

            <button type='button' style={{display:'flex',flexDirection:'column',alignItems:'center'}}>

                from

                <div>

                <input type='number' placeholder='20000' style={{width:'160px'}} onChange={(e)=>{setFrom(e.target.value)}}/>
                s.p
                </div>

                to

                <div>
                <input type='number' placeholder='50000' style={{width:'160px'}} onChange={(e)=>{setTo(e.target.value)}}/>
                s.p
                </div>

                <button type='button' className='go-btn' onClick={FromTo}>
                    Go
                </button>

                    </button>  
                    

                </div>

        </div>

        <div className='classificationbar'>

{/* //todo gender */}

<button type="button">your gender</button>

<div className='form-check' style={{paddingLeft:'50px'}}>
    <input className='form-check-input' type="radio" id="man" name="man" value="man"  onClick={mantoggle}/>
    <label className='form-check-label' for="man">man</label>
</div>

<div className='form-check' style={{paddingLeft:'50px'}}>           
    <input className="form-check-input" type="radio" id="woman" name="man" value="woman" onClick={womantoggle}/>
    <label className='form-check-label' for="woman">woman</label>
</div>

{/* //todo category */}

<button type="button">category</button>

<div id="Sman" style={{margin:'0px'}}>

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Blazer'  name="radio" value='Blazer' onClick={(e)=>sendCateg("Blazer","man")}/>
        <label className='form-check-label' for='Blazer'>Blazer</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Abayas'  name="radio" value='Abayas' onClick={(e)=>sendCateg("Abayas","man")}/>
        <label className='form-check-label' for='Abayas'>Abayas</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Hoodies'  name="radio" value='Hoodies' onClick={(e)=>sendCateg("Hoodies","man")}/>
        <label className='form-check-label' for='Hoodies'>Hoodies</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Jackets'  name="radio" value='Jackets' onClick={(e)=>sendCateg("Jackets","man")}/>
        <label className='form-check-label' for='Jackets'>Jackets</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Pants'  name="radio" value='Pants' onClick={(e)=>sendCateg("Pants","man")}/>
        <label className='form-check-label' for='Pants'>Pants</label>
    </div>



     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Shirts'  name="radio" value='Shirts' onClick={(e)=>sendCateg("Shirts","man")}/>
        <label className='form-check-label' for='Shirts'>Shirts</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Sets'  name="radio" value='Sets' onClick={(e)=>sendCateg("Sets","man")}/>
        <label className='form-check-label' for='Sets'>Sets</label>
    </div>



    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Shorts'  name="radio" value='Shorts' onClick={(e)=>sendCateg("Shorts","man")}/>
        <label className='form-check-label' for='Shorts'>Shorts</label>
    </div>



     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Suits'  name="radio" value='Suits' onClick={(e)=>sendCateg("Suits","man")}/>
        <label className='form-check-label' for='Suits'>Suits</label>
    </div>


    
     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='T-Shirts'  name="radio" value='T-Shirts' onClick={(e)=>sendCateg("T-Shirts","man")}/>
        <label className='form-check-label' for='T-Shirts'>T-Shirts</label>
    </div> 



    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Swimwear'  name="radio" value='Swimwear' onClick={(e)=>sendCateg("Swimwear","man")}/>
        <label className='form-check-label' for='Swimwear'>Swimwear</label>
    </div>                

    
    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Vests'  name="radio" value='Vests' onClick={(e)=>sendCateg("Vests","man")}/>
        <label className='form-check-label' for='Vests'>Vests</label>
    </div>  


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Pajamas'  name="radio" value='Pajamas' onClick={(e)=>sendCateg("Pajamas","man")}/>
        <label className='form-check-label' for='Pajamas'>Pajamas</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Bow ties'  name="radio" value='Bow ties' onClick={(e)=>sendCateg("Bow ties","man")}/>
        <label className='form-check-label' for='Bow ties'>Bow ties</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Hats'  name="radio" value='Hats' onClick={(e)=>sendCateg("Hats","man")}/>
        <label className='form-check-label' for='Hats'>Hats</label>
    </div>

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Scarves'  name="radio" value='Scarves' onClick={(e)=>sendCateg("Scarves","man")}/>
        <label className='form-check-label' for='Scarves'>Scarves</label>
    </div> 

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Ties'  name="radio" value='Ties' onClick={(e)=>sendCateg("Ties","man")}/>
        <label className='form-check-label' for='Ties'>Ties</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Belts'  name="radio" value='Belts' onClick={(e)=>sendCateg("Belts","man")}/>
        <label className='form-check-label' for='Belts'>Belts</label>
    </div>         


</div>

<div id="Swoman" style={{margin:'0px',display:'none'}}>

    

<div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Blazer'  name="radio" value='Blazer' onClick={(e)=>sendCateg("Blazer","woman")}/>
        <label className='form-check-label' for='Blazer'>Blazer</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Abayas'  name="radio" value='Abayas' onClick={(e)=>sendCateg("Abayas","woman")}/>
        <label className='form-check-label' for='Abayas'>Abayas</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Hoodies'  name="radio" value='Hoodies' onClick={(e)=>sendCateg("Hoodies","woman")}/>
        <label className='form-check-label' for='Hoodies'>Hoodies</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Jackets'  name="radio" value='Jackets' onClick={(e)=>sendCateg("Jackets","woman")}/>
        <label className='form-check-label' for='Jackets'>Jackets</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Dresses'  name="radio" value='Dresses' onClick={(e)=>sendCateg("Dresses","woman")}/>
        <label className='form-check-label' for='Dresses'>Dresses</label>
    </div>



     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Shirts'  name="radio" value='Shirts' onClick={(e)=>sendCateg("Shirts","woman")}/>
        <label className='form-check-label' for='Shirts'>Shirts</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Sets'  name="radio" value='Sets' onClick={(e)=>sendCateg("Sets","woman")}/>
        <label className='form-check-label' for='Sets'>Sets</label>
    </div>



    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Shorts'  name="radio" value='Shorts' onClick={(e)=>sendCateg("Shorts","woman")}/>
        <label className='form-check-label' for='Shorts'>Shorts</label>
    </div>



     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Suits'  name="radio" value='Suits' onClick={(e)=>sendCateg("Suits","woman")}/>
        <label className='form-check-label' for='Suits'>Suits</label>
    </div>


    
     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='T-Shirts'  name="radio" value='T-Shirts' onClick={(e)=>sendCateg("T-Shirts","woman")}/>
        <label className='form-check-label' for='T-Shirts'>T-Shirts</label>
    </div> 



    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Swimwear'  name="radio" value='Swimwear' onClick={(e)=>sendCateg("Swimwear","woman")}/>
        <label className='form-check-label' for='Swimwear'>Swimwear</label>
    </div>                

    
    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Vests'  name="radio" value='Vests' onClick={(e)=>sendCateg("Vests","woman")}/>
        <label className='form-check-label' for='Vests'>Vests</label>
    </div>  


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Pajamas'  name="radio" value='Pajamas' onClick={(e)=>sendCateg("Pajamas","woman")}/>
        <label className='form-check-label' for='Pajamas'>Pajamas</label>
    </div>

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='BodySuits'  name="radio" value='BodySuits' onClick={(e)=>sendCateg("BodySuits","woman")}/>
        <label className='form-check-label' for='BodySuits'>BodySuits</label>
    </div>

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Bow ties'  name="radio" value='Bow ties' onClick={(e)=>sendCateg("Bow ties","woman")}/>
        <label className='form-check-label' for='Bow ties'>Bow ties</label>
    </div>


    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Hats'  name="radio" value='Hats' onClick={(e)=>sendCateg("Hats","woman")}/>
        <label className='form-check-label' for='Hats'>Hats</label>
    </div>

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Scarves'  name="radio" value='Scarves' onClick={(e)=>sendCateg("Scarves","woman")}/>
        <label className='form-check-label' for='Scarves'>Scarves</label>
    </div> 

    <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Ties'  name="radio" value='Ties' onClick={(e)=>sendCateg("Ties","woman")}/>
        <label className='form-check-label' for='Ties'>Ties</label>
    </div>


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Belts'  name="radio" value='Belts' onClick={(e)=>sendCateg("Belts","woman")}/>
        <label className='form-check-label' for='Belts'>Belts</label>
    </div>     

     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Skirts'  name="radio" value='Skirts' onClick={(e)=>sendCateg("Skirts","woman")}/>
        <label className='form-check-label' for='Skirts'>Skirts</label>
    </div> 


     <div className='form-check' style={{paddingLeft:'50px'}}>
        <input className='form-check-input' type="radio" id='Jeans'  name="radio" value='Jeans' onClick={(e)=>sendCateg("Jeans","woman")}/>
        <label className='form-check-label' for='Jeans'>Jeans</label>
    </div>     


    
</div>
</div>    

            <div className="product">
                {
                    offer?
                    offer.map(one=>{
                        return <ProductCard image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :"Loading ..."
                }
                                {
                    noOffer ?
                    noOffer.map((one,index)=>{
                        return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :<h3>Loading ...</h3>
                }
                   
                {
                    LowToHigh2?
                    LowToHigh2.map((one,index)=>{return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.min} id={one._id}/>
                    
                    }):"Loading..."

                }
                {
                    HighToLow2?
                    HighToLow2.map((one,index)=>{return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.max} id={one._id}/>
                    
                    }):"Loading..."

                }
                {
                    FromTo2?
                    FromTo2.map((one,index) =>{return <ProductCard key={index} image={one.p.productImage} desc={one.p.description} price={one.s.newPrice} id={one.p._id}/>
                    
                    }):"Loading..."

                }
                   
                 {
                    categOffer2?
                    categOffer2.map(one=>{
                        return <ProductCard image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :""
                }
                {
                    categNoOffer2 ?
                    categNoOffer2.map((one,index)=>{
                        return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :<h3>Loading ...</h3>
                }
                {
                    GenderSortOffer2 ?
                    GenderSortOffer2.map((one,index)=>{
                        return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :<h3>Loading ...</h3>
                }
                {
                    GenderSortNoOffer2 ?
                    GenderSortNoOffer2.map((one,index)=>{
                        return <ProductCard key={index} image={one.productImage} desc={one.description} price={one.shops[0].newPrice} id={one._id}/>
                    })
                    :<h3>Loading ...</h3>
                }
                
               
            </div>

        </div> 

    );
}

export default Shopbody;