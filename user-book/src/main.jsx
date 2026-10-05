// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
// import App from './App.jsx';

// // import MyNavBar from './NavBar.jsx';
// // import ImageSlider from './ImageSlider.jsx';
// // import HomeCard from './HomeCard.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     {/* <MyNavBar />
//     <ImageSlider />
//     <HomeCard /> */}
//     <App/>
//   </StrictMode>
// );

import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>

        <BrowserRouter>
            <App />
        </BrowserRouter>

    </StrictMode>
)
