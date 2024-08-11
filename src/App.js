import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg';
import home from './assets/home.svg';
import saved from "./assets/bookmark.svg";
import rocket from './assets/rocket.svg';
import sendbtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgeLogo from './assets/chatgptLogo.svg';
import { sendMsgToOpenAI } from './Openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd= useRef(null);

  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
    text:"Hi, I am ChatGPT, a state-of-the-art language model developed by OpenAI. I'm designed to understand and generate human-like text based on the input I receive",
    isBot:true,
    }
  ]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [message]);

  const handleSend =async () => {
    const text = input;
    setInput('');
    setMessage([
      ...message,
      {text,isBot: false}
    ]);
    const res= await sendMsgToOpenAI(text);
    setMessage([
      ...message,
      { text, isbBot:false },
      { text : res, isBot:true}
    ]);
  }

  const handleEnter =async(e)=>{
    if(e.key === 'Enter')await handleSend();
  }

  const handleQuery = async(e) => {
    const text = e.target.value;
    setInput('');
    setMessage([
      ...message,
      {text,isBot: false}
    ]);
    const res= await sendMsgToOpenAI(text);
    setMessage([
      ...message,
      { text, isbBot:false },
      { text : res, isBot:true}
    ]);

   }

  return (
    <div className="App">
        <div className='sideBar'>
          <div className='upperSide'>
              <div className='upperSideTop'><img src={gptLogo} alt='Logo' className='logo'/><span className='brand'>ChatGPT</span> </div>
              <button className='midBtn' onClick={()=>{window.location.reload()}}><img src={addBtn} alt='new chat' className='addBtn' />New Chat</button>
              <div className='upperSideBottom'>
                <button className='query' onClick={handleQuery}  value={"What is Programming ?"}><img src={msgIcon} alt='Query' /> What is Programming ?</button>
                <button className='query' onClick={handleQuery}  value={"How to use an API ?"}><img src={msgIcon} alt='Query' /> How to use an API ?</button>               
             </div>
          </div>                                                                                    
          <div className='lowerSide'>
            <div className='listItems'><img src={home} alt='Home' className="listItemesImg" />Home</div>
            <div className='listItems'><img src={saved} alt='Saved' className="listItemesImg"  />Saved</div>
            <div className='listItems'><img src={rocket} alt='Upgrade' className="listItemesImg"  />Upgrade to Pro</div>
          </div>
        </div>
        <div className='main'>
          <div className='chats'>
            {message.map((message,i) => {
                <div key={i} className={message.isBot? 'chat bot':"chat"}>
                   <img className='chatImg' src={message.isBot?gptImgeLogo:userIcon} alt='' /> <p className='text'>{message.text}</p>
               </div>
            })}
            <div ref={msgEnd}/>
          </div>
          <div className='chatFooter'>
            <div className='inp'>
              <input type='text' placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e) => {setInput(e.target.value)}} /> <button className='send' onClick={handleSend}><img src={sendbtn} alt='Send' /></button>
            </div>
            <p>ChatGpt may produce inaccurate information about people, places, of facts. ChatGPT August 20 Version.</p>
          </div>
        </div>
  </div>
    
  );
}

export default App;
      