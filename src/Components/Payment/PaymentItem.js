import React from 'react';


function PaymentItem({name,value,date,type}) {
    return (
      
        <div style={{width:'300px',height:'fit-content',lineHeight:'40px',backgroundColor:'rgba(208, 148, 148, 0.21)',borderRadius:'20px',marginBottom:'20px',marginRight:'15px',padding:'10px',color:'#6B7AA1',fontWeight:'bold',display:'flex',flexDirection:'column',boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.25)'}}>

            <span>
                Payment Name : &nbsp;&nbsp;
                <span style={{color:'#11324D',fontWeight:'normal'}}>
                    {name}
                </span>
            </span>
            <span>
                Payment Value : &nbsp;&nbsp;
                <span style={{color:'#11324D',fontWeight:'normal'}}>
                    {value}
                </span>
            </span>
            <span>
                Payment Date : &nbsp;&nbsp;
                <span style={{color:'#11324D',fontWeight:'normal'}}>
                    {date}
                </span>
            </span>
            <span>
                Payment Type : &nbsp;&nbsp;
                <span style={{color:'#11324D',fontWeight:'normal'}}>

                    {type}
                </span>
            </span>

        </div>
    );
}

export default PaymentItem;