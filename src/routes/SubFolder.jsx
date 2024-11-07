import React, { useEffect, useState } from 'react'

const SubFolder = ({data,isActive,onClick}) => {
    const [showSubFolder , setShowSubFolder] = useState(false);
    const [activeSub , setActiveSub] = useState(null); // track sub-folder id to set active-folder class

    function handleActiveSub(id){
        setActiveSub(id);
    }

    useEffect(() => {
        if(!isActive){
            setShowSubFolder(false);
        }
    },[isActive]);


    function handleClick(){  
        onClick(); // setting the active folder id
        setShowSubFolder(prev => !prev);
    }

  return (
    <div className='master'>

        
        {
            data && 
            <div key={data.id} className={`folder-items ${isActive ? 'active-folder' : ''}`} onClick={handleClick}>
            <div className='icon-and-folder-name'>
            <span>
            {data.isFolder ? "📁" : "📄"} 
            </span> 
            {data.title}
            </div> 
            </div>
        }

 {/* recursively calling sub-folders */}
            {
                showSubFolder && 
                data.children.length ?
                <div className='right-side-folder'>
                {data.children.map((sub) => {
                    return <SubFolder 
                    key={sub.id} 
                    data={sub}
                    isActive={sub.id == activeSub}
                    onClick={() => handleActiveSub(sub.id)}
                    />
                })}
                </div>
                : 
                // handling no sub-folder criteria
                showSubFolder && 
                <div className='right-side-folder'> 
                    <div className="folder-items no-content">
                        <div className='icon-and-folder-name'>
                            <span>empty</span>
                        </div>
                    </div>
                </div>
            }


    </div>
  )
}

export default SubFolder


