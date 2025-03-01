
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MemeExplorer from './MemeExplorer';
import MemeVerse from './Memeverse';
import MemeUpload from './MemeUpload';
import MemeDetails from './MemeDetails';
import UserProfile from './UserProfile';
import NotFound from './NotFound';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
   <Route path='/' element={<MemeVerse />} />
   <Route path='/MemeExplorer' element={<MemeExplorer />} />
   <Route path='/MemeUpload'element={<MemeUpload/>}/>
   <Route path='/meme/:id' element={<MemeDetails/>}/>
   <Route path='/UserProfile'element={<UserProfile/>}/>
   <Route path='*'element={<NotFound/>}/>
   </Routes>
    </BrowserRouter>  
   
      
    </div>
  );
}

export default App;
