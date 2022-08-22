const { createSlice } = require("@reduxjs/toolkit");

const ProductDetailSlice=createSlice({
    name:'productDetail',
    initialState:{
        blue:[],
        green:{},
        red:[],
        orange:{},
        allProduct:{},
        product:{}
    },
    reducers:{
        displayProduct:(state,action)=>{

            const x=action.payload;

            state.blue=x.BLUE;
            state.red=x.RED;
            state.green=x.GREEN;
            state.orange=x.ORANGE;
            state.allProduct=x.allProduct;

            state.product={
                id:x.allProduct._id,
                image:x.allProduct.productImage,
                description:x.allProduct.description,
                colors:x.GREEN.newColor,
                sizes:x.GREEN.newSize,
                name:x.GREEN.name,
                old:x.GREEN.old,
                new:x.GREEN.new,
                sellerId:x.GREEN.sellerId
            };

        },
        mapProduct:(state,action)=>{


            state.product.colors=action.payload.newColor;
            state.product.sizes=action.payload.newSize;
            state.product.name=action.payload.name;
            state.product.old=action.payload.old;
            state.product.new=action.payload.new;
            state.product.sellerId=action.payload.sellerId;

        }
    }
})

export const {displayProduct,mapProduct}=ProductDetailSlice.actions;
export default ProductDetailSlice.reducer;