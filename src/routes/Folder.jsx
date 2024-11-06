import data from "../data/foldersInfo"
import SubFolder from "./SubFolder"
const Folder = () => {


  return (
    <div id='folder-page'>

        {
            data && 

            data.map((folder) => {
                return <SubFolder data={folder} key={folder.id} />
            })
        }

    </div>
  )
}

export default Folder