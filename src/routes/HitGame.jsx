import React, { useEffect, useRef, useState } from 'react'
import { generateRandomNumber } from '../logics/hitGameLogics'
import Button from "../components/Button"

const HitGame = () => {

    const [cells , setCells] = useState(Array.from({length:9},() => ""));
    const [isDisabled , setIsDisabled] = useState(false);
    const [score , setScore] = useState(0);
    const [userClicked , setUserClicked] = useState(false);
    const intervalTimer = useRef(null);
    const timeoutTimer = useRef(null);
    const watchUserActionId = useRef(null);
    // let intervalTimer;
    // let timeoutTimer;
    // let watchUserActionId;
    const userClickedRef = useRef(null);
    userClickedRef.current = userClicked;


    function startGame(){
        setIsDisabled(true);
        initiateGame();
        endGame(intervalTimer);

    }

    function initiateGame(){
        intervalTimer.current = setInterval(()=>{
            watchUserAction();
            setCells(Array.from({length:9},() => ""));
            const targetDiv = generateRandomNumber(); // random number between 0 and 8
            setCells(prev => {
                prev[targetDiv] = "HIT";
                return [...prev]
            })
            console.log("target",targetDiv)
        },1000)
    }

    function watchUserAction(){
        watchUserActionId.current = setInterval(()=>{
            if(!userClickedRef.current){
                setScore(prevScore =>  prevScore - 2.5);
                // console.log("score",score)
            }
        },1100)
    }

    function endGame(intervalTimer){
        console.log("end timer start");
         timeoutTimer.current = setTimeout(() => {
            const gameArea = document.getElementById('cell-container');
            gameArea.style.cursor = "not-allowed";
            console.log("clear interval id",intervalTimer.current)
            clearInterval(intervalTimer.current);
            clearInterval(watchUserActionId.current);
            alert('Game Ends',score);
        },5100)
    }

    function hit(intervalTimer,event){
        // clearInterval(intervalTimer.current);
        const clickedDiv = event.target;
        // const para = clickedDiv.getElementsByTagName('p')[0]; 
        console.log("clickedDiv",clickedDiv)
        // console.log("hit",para)
        // setScore(prevScore => para.innerText ? prevScore + 5 : prevScore - 2.5);
        // setUserClicked(true); // user clicked 
        // initiateGame();
    }

    function handleClick(event){
        console.log("handle click called",event.target.innerText)
        hit(intervalTimer,event)
    }

    useEffect(() => {
        const parent = document.getElementById('cell-container');


        parent.addEventListener('click',handleClick)

        return () => {
            clearTimeout(timeoutTimer.current);
            parent.removeEventListener('click',handleClick);
        }

    },[])



  return (
    <div id='hit-game-page'>

        <div id='cell-container'>
            {
                cells.map((cell,index) => <div key={index} className='cell'>{cell && cell}</div>)
            }
        </div>

        <div>
            <Button name="START GAME" fn={startGame} color="success" isDisabled={isDisabled} />
        </div>

    </div>
  )
}

export default HitGame