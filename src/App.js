import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ItineraryFormPage from './pages/ItineraryFormPage/ItineraryFormPage';
import Parking from './components/Parking/Parking';
import Restaurants from './components/Restaurants/Restaurants';
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
        <Route path='/form/:formId' element={<ItineraryFormPage />}/>
        <Route path='/parking' element={<Parking />}/>
        <Route path='/restaurants' element={<Restaurants />}/>
        <Route path='/completed' element={<CompletedItineraryPage />}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;