import React, {Component} from 'react';

export default class Toggle extends Component {
    state = {
        on:false,
    };

    toggle = () =>{
        this.setState({
            on: !this.state.on
            //current state of 'on' then change it to opposite then pass to 'on' again
        });
    };

    render (){
        return (
            <div>
                {
                    this.state.on && <h3 style={{color: 'black'}}>Thank you!</h3>   
                }
                <button onClick = {this.toggle}>Send</button>
            </div>
        );
    }
}