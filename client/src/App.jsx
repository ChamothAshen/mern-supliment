
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
import UpdateListing from './pages/UpdateListing';
import Listingspages from './pages/Listingspage';

export default function App() {
  return  <BrowserRouter
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
>
      <Heder/>
       <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/singn-in' element={<Singnin />} />
       <Route path='/sing-up' element={<SignUp />} />
       <Route path='/listing/:listingId' element={<Listing />} />
       <Route element={<PrivateRoute />}>
       <Route path='/profile' element={<Profile />} />
       <Route path='/create-listing' element={<CreateListing />} />
       <Route path='/ShowListings/:listingId' element={<ShowListings/>} />
       <Route path='/update-listing/:listingId' element={<UpdateListing />}   />
       </Route>
       <Route path='/About' element={<About />} />
       <Route path='/Listings' element={<Listingspages/>} />
       </Routes>
   </BrowserRouter>
}
