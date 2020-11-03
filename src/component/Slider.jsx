import React,{useState} from 'react';
import '../slider.scss';
import Img from './Img';
import i1 from '../data/pics/1.png';
import i2 from '../data/pics/2.png';
import i3 from '../data/pics/3.png';




function Slider (){
    let images = [
    <Img src={i3} />,
    <Img src={i1} />,
    <Img src={i2} />


];
    const [x,setX] = useState(0);
    const goLeft=()=> {
        x === 0 ? setX(-100 * (images.length -1)) : setX(x+100);
    };

    const goRight = () => {
        x === -100 * (images.length -1) ? setX(0) : setX(x-100);
    };

    const style = {transform : `translateX(${x}%)`}
    // SASS, var in div ok

    return (
        <div className = 'slider'>
            {
                images.map((item, index) => {
                    return(
                        <div 
                        key = {index} 
                        className = 'slide' 
                        style = {style} >
                            {item}
                        </div>
                    );
            })}
       <button id='goLeft' onClick = {goLeft}>
         <i className="fas fa-chevron-circle-left"></i>
       </button>
       <button id='goRight' onClick = {goRight}>
         <i className="fas fa-chevron-circle-right"></i>
       </button>
        </div>
    );
}
export default Slider;
