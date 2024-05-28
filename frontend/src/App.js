import { useEffect,useRef } from 'react';
import './App.css';
import React from 'react';
import P5Sketch from './sketch.js';
import Typed from 'typed.js';
import {ButtonGroup,Button} from '@mui/material';
import axios from 'axios';

function App() {
	const el = useRef(null);
	const ll = useRef(null);
useEffect(()=>{
  var options = {
    strings: ['Three-Handed Whist'],
    typeSpeed: 60
  };
  var mini = {
    strings: ['"Whist is a game requiring silence and a deep mind."— Charles Lamb',
      '"Life is like a game of whist. I don\'t enjoy the game much; but I like to play my cards well, and see what will be the end of it."   — George Eliot  ​',
      '"There are two classes of men; those who are content to yield to circumstances and who play whist; those who aim to control circumstances, and who play chess." — Mortimer Collins​ '
    ],
    typeSpeed: 40
  };
  
  var typed = new Typed(el.current, options);
  var less = new Typed(ll.current,mini);
typed.start();
less.start();
  
},[]);

const sendSMS = async () => {
  const body = window.prompt('Enter the message body:');
    const from ='+13343397091';
    const to = window.prompt('Enter the recipient number:');
    if (body && from && to) {
    try {
      const response = await axios.get('http://localhost:5000/api/send-sms', {
        params: { body, from, to },
      });
      console.log('SMS sent, SID:', response.data.sid);
      alert('INVITATION SENT');
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }
};


  return (
    <div className="Appm" >
        <P5Sketch />
        <div style={{ position: 'fixed', zIndex: 3,margin:'20px' }}>

        <br></br>
        <span id='ddm' ref={el}  style={{borderRadius:'5px', backgroundColor: 'white' ,fontSize:'50px',padding:'20',margin:'0'}} ></span>
        <br></br>
        <br></br>
        <span id='ddg' ref={ll}  style={{borderRadius:'1px', backgroundColor: 'white' ,fontSize:'20px',padding:'20',margin:'40'}} ></span>
        
        <br></br>
        <div>

        <ButtonGroup> 
          <Button variant="contained" color="success" style={{marginTop:'20px'}} href='/post'>
        LEARN ABOUT WHIST
        </Button>     
        <Button variant="contained" color="success" style={{marginTop:'20px'}} href='/bet'>
Play!!        </Button> 
<Button variant="contained" color="success" style={{marginTop:'20px'}} onClick={sendSMS}>
INVITE       </Button> 
<Button variant="contained" color="success" style={{marginTop:'20px'}}  href='/login'>
Login       </Button> 
</ButtonGroup>

   </div>
      </div>
    </div>
  );
}

export default App;
