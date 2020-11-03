import React from 'react';

function Img({src}){
    let imgStyle = {
        width:100 + '%',
        height:'auto'
    };

    return <img src = {src} style = {imgStyle}></img>;
}

export default Img;