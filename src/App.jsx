import './App.css';
import { useState } from 'react';
import Home, { switchComponent } from './routes/Home';


function App() {

  const [showComponent , setShowComponent] = useState('bucket');

  return (
    <>
      <Home setShowComponent={setShowComponent} />
      {switchComponent(showComponent)}
    </>
  )
}

export default App
