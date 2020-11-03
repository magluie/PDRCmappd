import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col,Divider} from 'antd';
// import '../Home.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function Advicebox (){
    const [isRecording, setIsRecording] = useState(false)
    const [note,setNote] = useState(null)
    const [savedNotes, setSavedNotes] = useState([])

    useEffect(() => {
        onListen()
    }, [isRecording])

    const onListen = () => {
        if(isRecording) {
            mic.start()
            mic.onend = () => {
                mic.start()
            }
        } else{
            mic.stop()
            mic.onend = () =>{
            }
        }
        mic.onstart = ()=>{
        }
        mic.onresult = event => {
            const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            console.log(transcript)
            setNote(transcript)
            mic.onerror = event =>{
                console.log(event.error)
            }
        }
    }

    const onSaveNote = () => {
        setSavedNotes([...savedNotes, note])
        setNote('')
    }

    return (
        <Fragment>
        <h2>You can use voice instead of typing</h2>
        <Row className="gutter-row" span={8} offset={1}>
            <div>
            {isRecording ? <span>Status: On</span> :<span>Status: Off</span>}
            <button onClick = {onSaveNote} disabled={!note}>Save</button>
            <button onClick = {() => setIsRecording(prevState => !prevState)}>Start/Stop</button>
            </div>
            <div className = 'current'>
            <h6>Current Notes</h6>
            <p>{note}</p>
            </div>
           
    </Row>
        <Divider type = 'vertial'/>
    <Row className="gutter-row" span={8} offset={1}>
        <div className = 'confirmed'>
        <h6>Confirmed Notes</h6>
          {savedNotes.map(n => (
              <p key={n}>{n}</p>
          ))}
        </div>
    </Row>    
    </Fragment>
    );
}

export default Advicebox;