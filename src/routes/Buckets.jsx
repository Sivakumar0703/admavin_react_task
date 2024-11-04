import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import { disableSelectionArea, enableSelectionArea, selectionAndDeselection } from '../logics/bucketLogics';

const Buckets = () => {

    const [selectedItems , setSelectedItems] = useState([]);
    const selectedItemsRef = useRef(null);
    selectedItemsRef.current = selectedItems;
    console.log("from outside",selectedItems , selectedItems.length > 1)




    useEffect(() => {

        const bucket1 = document.getElementById('bucket-1');
        const bucket2 = document.getElementById('bucket-2');
        let itemTransferringBucket;
        let destinationBucket;

        const handleSelection = (e) => selectionAndDeselection(e,selectedItemsRef,setSelectedItems,removeEventListners);
        const handleDisable = () => disableSelectionArea(destinationBucket);
        const handleEnable = () => enableSelectionArea(destinationBucket);

        function setupEventListners(){
            if(itemTransferringBucket && destinationBucket){
                // itemTransferringBucket.addEventListener('click' , handleSelection);
                destinationBucket.addEventListener('mouseenter' , handleDisable);
                destinationBucket.addEventListener('mouseleave' , handleEnable);
            }
        }

        function removeEventListners(){
            if(itemTransferringBucket && destinationBucket){
                itemTransferringBucket.removeEventListener('click' , handleSelection);
                destinationBucket.removeEventListener('mouseenter' , handleDisable);
                destinationBucket.removeEventListener('mouseleave' , handleEnable);
            }
        }

        function handleBucketClick(clickedBucket,e){
            itemTransferringBucket = clickedBucket === "bucket1" ? bucket1 : bucket2;
            destinationBucket = clickedBucket === "bucket1" ? bucket2 : bucket1;
            // handleSelection(e);
            setupEventListners();
        }

        bucket1.addEventListener('click' , (e) => {
            handleBucketClick("bucket1",e)
            itemTransferringBucket.addEventListener('click' , handleSelection(e));
        })

        bucket2.addEventListener('click' , (e) => {
            handleBucketClick("bucket2",e)
            itemTransferringBucket.addEventListener('click' , handleSelection(e));
        })
        // bucket2.addEventListener('click' , (e) => handleBucketClick("bucket2",e) )
  
        return () => removeEventListners();

    },[])

  return (
    <div className='default-page-stylings'>

        <div id='bucket-page-container'>

            <div id='bucket-1' className='bucket'>
                <h2 className='title'>Bucket-1</h2>
                <p className='items'>Item-1</p>
                <p className='items'>Item-2</p>
                <p className='items'>Item-3</p>
                <p className='items'>Item-5</p>
            </div>

            <div id='options'>
                <Button name={"Add"} color="success" isDisabled={selectedItems.length === 1 ? false : true}  />
                <Button name={"Remove"} color="danger" isDisabled={selectedItems.length === 1 ? false : true}  />
                <Button name={"Add All"} color="success" isDisabled={selectedItems.length > 1 ? false : true}  />
                <Button name={"Remove All"} color="danger" isDisabled={selectedItems.length > 1 ? false : true}  />
            </div>

            <div id='bucket-2' className='bucket'>
            <h2 className='title'>Bucket-2</h2>
            <p className='items'>Item-4</p>
            <p className='items'>Item-6</p>
            </div>

        </div>

    </div>
  )
}

export default Buckets