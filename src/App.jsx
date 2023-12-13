import { useState,useEffect } from 'react'
import { FaPlayCircle,FaPauseCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('');
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(null);


  useEffect(() => {
    let timer;

    if (isTimerRunning && inputValue !== '') {
      if (time === 0) {
        const totalTime = parseInt(inputValue) * 60;
        setTime(totalTime);
      }
      
      timer = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, inputValue, time]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handlePlay = () => {
    setIsTimerRunning(prevState => !prevState);
   
   
  };
  const handlePlayPause = () => {
    setIsTimerRunning(prevState => !prevState);
    if(time!=inputValue){
      const inputValueInSeconds = parseInt(inputValue) * 60;
      setTime(inputValueInSeconds);
    }
  };

  const handleReset = () => {
    setIsTimerRunning(false);
  const inputValueInSeconds = parseInt(inputValue) * 60;
  setTime(inputValueInSeconds);
  };

  return (
    <div className="mainContainer" >
    <div className="inputContainer">
    <h1 className="heading">Enter minutes</h1>
      <input className="inputBox" type="number"  onChange={e => {
            setInputValue(e.target.value);
            setIsTimerRunning(false); 
          }}/>
    </div>
    <div className="displaySection">
    {formatTime(time)}
        {isTimerRunning ? (
          <FaPauseCircle onClick={handlePlay} className="icon" />
        ) : (
          <FaPlayCircle onClick={handlePlayPause} className="icon" />
        )}
        <BiReset className="icon" onClick={handleReset}/>
    </div>
     
    </div>
  )
}

export default App
