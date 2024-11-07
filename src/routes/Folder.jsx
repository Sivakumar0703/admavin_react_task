import { useState } from "react";
import data from "../data/foldersInfo"
import SubFolder from "./SubFolder"


const Folder = () => {

  const [activeFolderId , setActiveFolderId] = useState(null); 

  function handleFolderClick(id){
    setActiveFolderId(id);
  }

  return (
    <div id='folder-page'>

      {
        data && 

        data.map((folder) => {
          return <SubFolder 
          data={folder} 
          key={folder.id} 
          // to find active folder
          isActive={folder.id == activeFolderId}
          onClick={() => handleFolderClick(folder.id)}
          />
        })
      }

    </div>
  )
}

export default Folder