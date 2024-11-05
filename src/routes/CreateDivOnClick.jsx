import { handleClick } from "../logics/boxSplit"

const CreateDivOnClick = () => {

  return (
    <div id='box-split-page'>
        <h2>Split box - click inside the box </h2>

        <div id='initial-square' onClick={handleClick}> 

        </div>

    </div>
  )
}

export default CreateDivOnClick