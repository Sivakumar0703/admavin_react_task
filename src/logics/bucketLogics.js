
// selecting and de-selecting the items
export function selectionAndDeselection(e,selectedItemsRef,setSelectedItems,removeEventListners) {
    const selectedItemValue = e.target.innerText;
    const checkAvailability = selectedItemsRef.current.some(item => item.innerText == selectedItemValue);
    if(e.target.tagName == "P"){
        
        if(checkAvailability){
            console.log("already")
            e.target.style.opacity = "1";
            const newlySelectedValue = selectedItemsRef.current.filter(item => item.innerText != selectedItemValue)
            setSelectedItems(newlySelectedValue)
            console.log(newlySelectedValue.length)
            if(!newlySelectedValue.length){
                removeEventListners();
            }
        } else {
            console.log("adding")
            e.target.style.opacity = "0.5"
            setSelectedItems(prev => [...prev , e.target])
        }

    }
}

// disable cursor for selecting items in destination bucket
export function disableSelectionArea(bucket){
    bucket.style.cursor = "not-allowed";
    const pTags = bucket.getElementsByTagName('p');
    for(let i=0; i<pTags.length; i++){
        pTags[i].style.cursor = "not-allowed";
    }
}

// enable cursor for selecting items
export function enableSelectionArea(bucket){
    bucket.style.cursor = "default";
    const pTags = bucket.getElementsByTagName('p');
    for(let i=0; i<pTags.length; i++){
        pTags[i].style.cursor = "pointer";
    }
}


