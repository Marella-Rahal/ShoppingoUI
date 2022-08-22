import React from 'react';
import styled from 'styled-components';

const InputRadio=styled.input.attrs(props=>({
     type:"radio",
     name:props.name
 }))`
    width:25px;
    height:25px;
    margin-inline:2px;
    &::after{
        content: '';
        width: 25px;
        height: 25px;
        border-radius: 15px;
        position: absolute;
        visibility: visible;
        background-color: ${props=> props.color};
    };
    &:checked::after{
        content: '';
        width: 25px;
        height: 25px;
        border-radius: 15px;
        position: absolute;
        visibility: visible;
        border: solid 7px ${props=>props.color=='#ffffff'?'#0E1D51':'white'};
    }

`

function Colors(props) {


    return (
        <>
            <InputRadio required color={props.color} name="color" onClick={()=>props.setColors([props.color])}/>
        </>
    );
}

export default Colors;