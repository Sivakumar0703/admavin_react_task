import Button from "../components/Button"
import Buckets from "./Buckets";
import CreateDivOnClick from "./CreateDivOnClick";
import Folder from "./Folder";
import HitGame from "./HitGame";
import InfiniteScroll from "./InfiniteScroll";

const Home = ({setShowComponent}) => {
  
  return (
    <div id='home-page-container'>
    <h2>Select the below option to view the task</h2>

    <div id='home-page-buttons-group'>
        
      <Button name="Transfer Items Task" fn={() => setShowComponent('bucket')} width="150px" />
      <Button name="Divide Box Task" fn={() => setShowComponent('box')} width="150px" />
      <Button name="Infinite Scroll Task" fn={() => setShowComponent('scroll')} width="150px" />
      <Button name="Hit Game Task" fn={() => setShowComponent('hit')} width="150px" />
      <Button name="Folder Task" fn={() => setShowComponent('folder')} width="150px" />

    </div>

    </div>
  )
}

export default Home



export function switchComponent(showComponent){
  switch(showComponent) {
      case 'bucket':
        return <Buckets />;

      case 'box':
        return <CreateDivOnClick />;
        
      case 'folder':
        return <Folder />;

      case 'hit':
        return <HitGame />;

      case 'scroll':
        return <InfiniteScroll />;

      default:
      return ; 
    }
}