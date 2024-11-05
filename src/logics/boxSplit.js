
export  function handleClick(e){
    console.log('clicked',e.target)
    const parent = e.target;
    parent.classList.add('four-div')
    for(let i=0; i<4; i++){
        const child = document.createElement('div');
        child.classList.add('child-div-style')
        parent.append(child);
    }
}