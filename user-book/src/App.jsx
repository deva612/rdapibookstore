
// import 'bootstrap/dist/css/bootstrap.min.css';


// function App() {
//   return (
//     <>
     
//       <h1>We are going to design frontend</h1>
//     </>
//   );
// }

// export default App;
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ImageSlider from './ImageSlider.jsx';
import HomeCard from './HomeCard.jsx';
import BookDetails from './page/BookDetails.jsx';
import Cart from './page/Cart.jsx';
import Checkout from './page/Checkout.jsx';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.jsx';

const HomePage = () => (
    <>
        <Hero />
        <ImageSlider />
        <HomeCard />
    </>
)

function App() {

    return (
        <> 
        
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/books" element={<HomePage />} />
                <Route path="/book/:id" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer/>
        </>
    )
}

export default App