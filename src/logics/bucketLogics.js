
// selecting and de-selecting the items
export function selectionAndDeselection(e,selectedItemsRef,setSelectedItems,destinationBucket,handleDisable) {
    const selectedItemValue = e.target.innerText;
    const checkAvailability = selectedItemsRef.current.some(item => item == selectedItemValue);
    if(e.target.tagName == "P"){       
        if(checkAvailability){
            e.target.style.opacity = "1";
            const newlySelectedValue = selectedItemsRef.current.filter(item => item != selectedItemValue);
            setSelectedItems(newlySelectedValue);
            if(!newlySelectedValue.length){
                destinationBucket.removeEventListener('mouseenter' , handleDisable);
                // enableSelectionArea(destinationBucket);
                disableOrEnableSelection(destinationBucket,"enable");
            }
        } else {
            e.target.style.opacity = "0.5";
            setSelectedItems(prev => [...prev , selectedItemValue]);
        }
    }
}

// disable cursor for selecting items in destination bucket
// export function disableSelectionArea(bucket){
//     bucket.style.cursor = "not-allowed";
//     const pTags = bucket.getElementsByTagName('p');
//     for(let i=0; i<pTags.length; i++){
//         pTags[i].style.cursor = "not-allowed";
//     }
// }

// enable cursor for selecting items
// export function enableSelectionArea(bucket){
//     bucket.style.cursor = "default";
//     const pTags = bucket.getElementsByTagName('p');
//     for(let i=0; i<pTags.length; i++){
//         pTags[i].style.cursor = "pointer";
//     }
// }

// operation = enable | operation = disable
export function disableOrEnableSelection(bucket,operation){
    bucket.style.cursor = operation === "disable" ? "not-allowed" : "default" ;
    const pTags = bucket.getElementsByTagName('p');
    for(let i=0; i<pTags.length; i++){
        pTags[i].style.cursor = operation === "disable" ? "not-allowed" : "pointer" ;
    }
}

// transfer single/multiple items 
export function transferItems(setSelectedItems,selectedItemsRef,setBucket1,setBucket2,bucket1,bucket2,bucketContainer,handleDisable){
    let selectedItems = selectedItemsRef.current;
    if(bucketContainer.transferringBucket.id === "bucket-1"){
        setBucket1(removeSentItemsFromBucket(selectedItems , bucket1));
        setBucket2(prev => [...prev , ...selectedItems]);
    } else {
        setBucket2(removeSentItemsFromBucket(selectedItems , bucket2));
        setBucket1(prev => [...prev , ...selectedItems]);
    }
    bucketContainer.destinationBucket.removeEventListener('mouseenter' , handleDisable);
    // enableSelectionArea(bucketContainer.destinationBucket);
    disableOrEnableSelection(bucketContainer.destinationBucket,"enable");
    setSelectedItems([]);
}

// removing the transferring items from the transferring bucket
function removeSentItemsFromBucket(selectedItems , storedItems){
    let remainingItems;
    if(selectedItems.length > 1){
        remainingItems = storedItems.filter(item => !selectedItems.includes(item));
    } else {
        remainingItems = storedItems.filter(item => item !== selectedItems[0]);   
    }
    return remainingItems
}

// delete single/multiple items
export function deleteItems(bucketContainer,selectedItemsRef,bucket1,bucket2,setBucket1,setBucket2,setSelectedItems,handleDisable){
    if(bucketContainer.transferringBucket.id === "bucket-1"){
        const updatedItemsList = bucket1.filter(item => !selectedItemsRef.current.includes(item));
        setBucket1(updatedItemsList);
    } else {
        const updatedItemsList = bucket2.filter(item => !selectedItemsRef.current.includes(item));
        setBucket2(updatedItemsList);
    }
    bucketContainer.destinationBucket.removeEventListener('mouseenter' , handleDisable);
    // enableSelectionArea(bucketContainer.destinationBucket);
    disableOrEnableSelection(bucketContainer.destinationBucket,"enable");
    setSelectedItems([]);
}

