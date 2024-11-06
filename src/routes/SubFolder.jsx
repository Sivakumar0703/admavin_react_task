import React, { useState } from 'react'

const SubFolder = ({data}) => {
    const [showSubFolder , setShowSubFolder] = useState(false);


    // function appendAlert(){
    //     const parent = document.getElementsByClassName('master')[0];
    //     const div = document.createElement('div');
    //     div.classList.add('right-side-folder');
    //     div.classList.add('no-content');
    //     div.innerText = "no files";
    //     parent.append(div);
    // }


    function handleClick(){   
        if(!data.children.length){
            console.log("no files");
            // appendAlert()
        } 
        setShowSubFolder(prev => !prev);
    }

  return (
    <div className='master'>

        
        {
            data && 
            <div key={data.id} className='folder-items' onClick={handleClick}>
            <div className='icon-and-folder-name'>
            <span>
            {data.isFolder ? "📁" : "📄"} 
            </span> 
            {data.title}
            </div> 
            </div>
        }


         

        
            {
                showSubFolder && 
                data.children &&
                <div className='right-side-folder'>
                {data.children.map((sub) => {
                    return <SubFolder key={sub.id} data={sub} />
                })}
                </div>
                // : ""
                // <div className='right-side-folder'>
                //     {
                //         <SubFolder data={ownData} />
                //     }
                // </div>
            }


    </div>
  )
}

export default SubFolder


