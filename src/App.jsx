
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Singnin from './pages/Singnin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';

export default function App() {
  return   <BrowserRouter>
       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/sing-in' element={<Singnin />} />
       <Route path='/sing-UP' element={<SignUp />} />
       <Route path='/profile' element={<Profile />} />
       <Route path='/About' element={<About />} />
       </Routes>
   </BrowserRouter>
}