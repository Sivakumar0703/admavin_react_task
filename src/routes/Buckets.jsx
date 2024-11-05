import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import { deleteItems, disableOrEnableSelection, selectionAndDeselection, transferItems } from '../logics/bucketLogics';

const Buckets = () => {

    const [selectedItems , setSelectedItems] = useState([]);
    const selectedItemsRef = useRef(null);
    const [bucketContainer , setBucketContainer] = useState({transferringBucket:{},destinationBucket:{}}); // contains transferring and destionation bucket div
    selectedItemsRef.current = selectedItems;
    const [bucket1 , setBucket1] = useState(["Item-1","Item-2","Item-3","Item-5"]);
    const [bucket2 , setBucket2] = useState(["Item-4","Item-6"]);

    const handleDisable = (destinationBucket) => disableOrEnableSelection(destinationBucket,"disable");



    useEffect(() => {

        const bucket1Div = document.getElementById('bucket-1');
        const bucket2Div = document.getElementById('bucket-2');
        let itemTransferringBucket;
        let destinationBucket;

        const handleSelection = (e) => selectionAndDeselection(e,selectedItemsRef,setSelectedItems,destinationBucket,handleDisable);

        function setupEventListners(){
            if(itemTransferringBucket && destinationBucket){
                destinationBucket.addEventListener('mouseenter' , handleDisable(destinationBucket));
            }
        }

        function handleBucketClick(clickedBucket){
            itemTransferringBucket = clickedBucket === "bucket1" ? bucket1Div : bucket2Div;
            destinationBucket = clickedBucket === "bucket1" ? bucket2Div : bucket1Div;
            setupEventListners();
            if(clickedBucket === "bucket1"){
                setBucketContainer({transferringBucket:bucket1Div,destinationBucket:bucket2Div})
            } else {
                setBucketContainer({transferringBucket:bucket2Div,destinationBucket:bucket1Div})
            }
        }

        bucket1Div.addEventListener('click' , (e) => {
            handleBucketClick("bucket1",e)
            itemTransferringBucket.addEventListener('click' , handleSelection(e));
        })

        bucket2Div.addEventListener('click' , (e) => {
            handleBucketClick("bucket2",e)
            itemTransferringBucket.addEventListener('click' , handleSelection(e));
        })

        // on component unmount
        function removeEventListners(){
            if(itemTransferringBucket && destinationBucket){
                itemTransferringBucket.removeEventListener('click' , handleSelection);
                destinationBucket.removeEventListener('mouseenter' , handleDisable);
            }
        }
  
        return () => removeEventListners();

    },[])

  return (
    <div className='default-page-stylings'>

        <div id='bucket-page-container'>

            <div id='bucket-1' className='bucket'>
                <h2 className='title'>Bucket-1</h2>
                {
                    bucket1?.map((item) => <p key={item} className='items'>{item}</p> )
                }
            </div>

            <div id='options'>
                <Button name={"Add"} color="success" fn={() => transferItems(setSelectedItems,selectedItemsRef,setBucket1,setBucket2,bucket1,bucket2,bucketContainer,handleDisable)} isDisabled={selectedItems.length === 1 ? false : true}  />
                <Button name={"Remove"} color="danger" fn={() => deleteItems(bucketContainer,selectedItemsRef,bucket1,bucket2,setBucket1,setBucket2,setSelectedItems,handleDisable)}  isDisabled={selectedItems.length === 1 ? false : true}  />
                <Button name={"Add All"} color="success" fn={() => transferItems(setSelectedItems,selectedItemsRef,setBucket1,setBucket2,bucket1,bucket2,bucketContainer,handleDisable)} isDisabled={selectedItems.length > 1 ? false : true}  />
                <Button name={"Remove All"} color="danger" fn={() => deleteItems(bucketContainer,selectedItemsRef,bucket1,bucket2,setBucket1,setBucket2,setSelectedItems,handleDisable)}  isDisabled={selectedItems.length > 1 ? false : true}  />
            </div>

            <div id='bucket-2' className='bucket'>
            <h2 className='title'>Bucket-2</h2>
            {
                bucket2?.map((item) => <p key={item} className='items'>{item}</p> )
            }
            </div>

        </div>

    </div>
  )
}

export default Buckets