
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Singnin from './pages/Singnin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import About from './pages/About';
import Heder from './component/Heder';
import PrivateRoute from'./component/PrivateRoute'
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import ShowListings from './pages/ShowListings ';

export default function App() {
  return  <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
      <Heder/>
       <Routes>
       <Route path='/Home' element={<Home />} />
       <Route path='/singn-in' element={<Singnin />} />
       <Route path='/sing-up' element={<SignUp />} />
       <Route path='/listing/:listingId' element={<Listing />} />
       <Route element={<PrivateRoute />}>
       <Route path='/profile' element={<Profile />} />
       <Route path='/create-listing' element={<CreateListing />} />
       <Route path='/ShowListings/:listingId' element={<ShowListings/>} />
       </Route>
       <Route path='/About' element={<About />} />
       </Routes>
   </BrowserRouter>
}
