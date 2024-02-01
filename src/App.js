import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ItineraryFormPage from './pages/ItineraryFormPage/ItineraryFormPage';
import ParkingPage from './pages/ParkingPage/ParkingPage';
import RestaurantsPage from './pages/RestaurantsPage/RestaurantsPage';
import CompletedItineraryPage from './pages/CompletedItineraryPage/CompletedItineraryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/form' element={<ItineraryFormPage />}/>
        <Route path='/parking' element={<ParkingPage />}/>
        <Route path='/restaurants' element={<RestaurantsPage />}/>
        <Route path='/completed' element={<CompletedItineraryPage />}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;