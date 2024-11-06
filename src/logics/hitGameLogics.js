
// generate random number between 0 and 8
export function generateRandomNumber(){
    const randomNumber = Math.floor(Math.random()*9);
    return randomNumber
}


export function startGame(setIsPlaying,setScore,setIsDisabled){
    setIsDisabled(true);
    setIsPlaying(true);
    setScore(0);
}


export function endGame(setIsPlaying,intervalRef,timeoutRef,setCells,clearCellsTimeoutIdRef,setIsGameOver){
    clearTimeout(clearCellsTimeoutIdRef.current);
    setCells(Array(9).fill(""));
    setIsPlaying(false);
    clearInterval(intervalRef.current); 
    clearTimeout(timeoutRef.current); 
    setIsGameOver(true);
}


export function setKey(setCells,setScore,setIsClickAllowed,isClickAllowedRef,clearCellsTimeoutIdRef){
    const newCells = Array(9).fill("");
    const randomNumber = generateRandomNumber();
    newCells[randomNumber] = "HIT";
    setCells(newCells);
    clearCellsTimeoutIdRef.current = setTimeout(() => {
        let wasGamePlayed = isClickAllowedRef.current;
        if(wasGamePlayed){ // if user didn't click 
            setScore(prevScore => {
                return prevScore - 2.5
            });
        }
        setIsClickAllowed(false); // sometimes user perfom click action after executing set timeout (it calculate score twice) so we prevent that
        setCells(Array(9).fill(""));
    },1000); // 950 
}


export function handleClick(index,cellsRef,setScore){
    if(cellsRef.current[index] === "HIT"){ // clicked on right cell
        setScore(prevScore => {
            return prevScore + 5
        });
    } else { // clicked on wrong cell
        setScore(prevScore => {
            return prevScore - 2.5
        });
    }
}


export function resetGame(setCells,setScore,setIsPlaying,setIsDisabled,setIsGameOver){
    setCells(Array(9).fill(""));
    setScore(0);
    setIsPlaying(true);
    setIsDisabled(true);
    setIsGameOver(false);
}