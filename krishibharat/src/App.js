import React from "react";
import {Routes, Route} from 'react-router-dom';
import Header from './Components/Common/Header';
import Home from './Components/Home';
import Navigate from './Components/Navigate'; 
import Userdata from './Components/Userdata';


function App() {  
  return (    
    <div className="App">
      <div className='topPanel'>    
        <Navigate />
      </div>
      <div className='leftPanel'>
        <Header />
      </div>
      <div className='rightPanel'>
      
      <Routes>
      <Route path='/' element={<Home/>} /> 
      <Route path='/userdata' element={<Userdata/>} />  
      </Routes> 
      </div>
    </div>
  );
}



export default App;
