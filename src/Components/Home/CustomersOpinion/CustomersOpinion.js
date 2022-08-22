import React, {useState } from 'react';
import './CustomersOpinion.css';
import  { clearSleepingPopup, showSleepingPopup, sleep } from '../../PopUp/SleepingPopup';




function CustomersOpinion(props) {

    const [vHappyc,setvH]=useState(0);
    const [Happyc,setH]=useState(0);
    const [notc,setn]=useState(0);
    const [sadc,setsc]=useState(0);
    const [vsadc,setvs]=useState(0);

    const future=async()=>{

        showSleepingPopup();
    
        await sleep(2000);
    
        clearSleepingPopup();
    
    }

    return (
        <div className="container-fluid opinion">

            <h2 className='text-center' style={{color:"#0D065E"}}>Customers Opinion</h2>

            <h1 className='text-center' style={{color:"#0D065E"}}>Did you like our site</h1>

            <div className='faces'>

                <button onClick={future} className='face-btn'>&#128516;
                        <br/>
                        <span style={{fontSize:'30px',color:'#0D065E'}}>
                            {vHappyc}                
                        </span>
                </button>

                <button onClick={future} className='face-btn'>&#128512;
                        <br/>
                        <span style={{fontSize:'30px',color:'#0D065E'}}>
                            {Happyc}                
                        </span>
                </button>

                <button onClick={future} className='face-btn'>&#128529;
                        <br/>
                        <span style={{fontSize:'30px',color:'#0D065E'}}>
                            {notc}                
                        </span>
                </button>

                <button onClick={future} className='face-btn'>&#128577;
                        <br/>
                        <span style={{fontSize:'30px',color:'#0D065E'}}>
                            {sadc}                
                        </span>
                </button>

                <button onClick={future} className='face-btn'>&#128542;
                        <br/>
                        <span style={{fontSize:'30px',color:'#0D065E'}}>
                            {vsadc}                
                        </span>
                </button>

            </div>

            <h1 className='text-center' style={{color:"#0D065E"}}>Please help us improve our site</h1>

            <form style={{maxWidth:'500px'}} className="text-btn">
                <div class="mb-3 mt-3">
                    <textarea className="form-control" rows="5" id="comment" name="text" placeholder='write a comment'></textarea>
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <button type="button" className="send-btn" onClick={future}>Send</button>
                </div>
            </form>

        </div>
    );
}

export default CustomersOpinion;