import { useState,useEffect } from 'react'
import { FaPlayCircle,FaPauseCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let timer=null;
    
    if (isTimerRunning && inputValue !== '') {
      const totalTime = parseInt(inputValue) * 60;
      setTime(totalTime);
      //keep storing time in this variable, its used when counter is stooped and played again
      if (currentTime > 0) {
        setTime(currentTime);
      }

        timer = setInterval(() => {
          setTime(prevTime => {
            if (prevTime <= 0) {
              clearInterval(timer);
              setIsTimerRunning(false);
              setInputValue('0');
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => {clearInterval(timer);
   }
}, [isTimerRunning, inputValue,currentTime]);

 //to convert minutes into hr:min:sec
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  
  const handlePlayPause = () => {
    setIsTimerRunning(prevState => !prevState);
    setCurrentTime(time);
  };

  const handleReset = () => {
  setIsTimerRunning(false);
  setInputValue('0');
  setTime(0);
  };

  return (
    <div className="mainContainer" >
    <div className="inputContainer">
    <h1 className="heading">Enter minutes</h1>
      <input className="inputBox" type="number"  onChange={e => {
            setInputValue(e.target.value);
            setTime(0)
            setIsTimerRunning(false); 
           
          }}
            value={inputValue}
          />
    </div>
    <div className="displaySection">
    {formatTime(time)}
        {isTimerRunning ? (
          <FaPauseCircle onClick={handlePlayPause} className="icon" />
        ) : (
          <FaPlayCircle onClick={handlePlayPause} className="icon" />
        )}
        <BiReset className="icon" onClick={handleReset}/>
    </div>
     
    </div>
  )
}

export default App
