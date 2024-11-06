import React, { useEffect, useRef, useState } from 'react'
import { handleClick , startGame , setKey , endGame, resetGame } from '../logics/hitGameLogics'
import Button from "../components/Button"

const HitGame = () => {

    const [cells , setCells] = useState(Array(9).fill(""));
    const [score , setScore] = useState(0);
    const [isPlaying , setIsPlaying] = useState(false);
    const [isDisabled , setIsDisabled] = useState(false);
    const [isClickAllowed , setIsClickAllowed] = useState(true); // prevents user from clicking multiples times in single game
    const [isGameOver , setIsGameOver] = useState(false);
    const cellsRef = useRef(null);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);
    const isClickAllowedRef = useRef(null);
    const clearCellsTimeoutIdRef = useRef(null);

    // make the ref always to hold the current value
    useEffect(() => {
        cellsRef.current = cells;
    },[cells])

    useEffect(() => {
        isClickAllowedRef.current = isClickAllowed;
    },[isClickAllowed])

    // set keyword after 1s
    const setKeyWrapper = () => {
        setIsClickAllowed(true);
        setKey(setCells,setScore,setIsClickAllowed,isClickAllowedRef,clearCellsTimeoutIdRef);
    }

    // clear interval and timeout when game ends
    const endGameWrapper = () => {
        endGame(setIsPlaying,intervalRef,timeoutRef,setCells,clearCellsTimeoutIdRef,setIsGameOver);
    }

    // track the user action
    const handleClickWrapper = (index) => {
        if(isClickAllowed){
            setIsClickAllowed(false);
            handleClick(index,cellsRef,setScore);
        }
    }

    // 1.100 second is implemented because it take some time to clear the previous keyword and set the new one.
    // if we use 1000 then there will be clash between clearing the previous keyword and creating the new keyword.
    useEffect(() => {

        if(isPlaying){
            intervalRef.current = setInterval(setKeyWrapper , 1100); // for 5 games - 1100 | for 1 minute - 1100
            timeoutRef.current = setTimeout(endGameWrapper,6550); // for 5 games - 6550 | for 1 minute - 60000
            return () => {
                clearInterval(intervalRef.current);
                clearTimeout(timeoutRef.current);
            }    
        }

    },[isPlaying])

    return(
        <div id='hit-game-page'>

            <h2 className='title'>HIT GAME</h2>

            {/* gamming area */}

            <div id='cell-container'>
            {
                cells.map((cell,index) => <div key={index} onClick={() => handleClickWrapper(index)} className='cell'>{cell && cell}</div>)
            }
            </div>

            {/* game start and restart buttons */}
            <div>
                {
                    isGameOver ? 
                    <Button name="RESTART" fn={() => resetGame(setCells,setScore,setIsPlaying,setIsDisabled,setIsGameOver)} color="primary" /> 
                    :
                    <Button name="START GAME" fn={() => startGame(setIsPlaying,setScore,setIsDisabled)} color="success" isDisabled={isDisabled} />
                }
            </div>

            {/* display score area */}
            <div>
                {
                    isGameOver ? 
                    <div>
                        <h3>YOUR SCORE IS : <span>{score}</span></h3>
                    </div> 
                    : ""
                }
            </div>

        </div>
    )
}


export default HitGame