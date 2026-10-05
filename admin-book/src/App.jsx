import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import BookList from './pages/books/BookList'
import AddBook from './pages/books/AddBook'
import BookPageForEdit from './pages/books/BookPageForEdit'
import AdminLogin from './pages/LoginSignupPages/AdminLogin'
import CreateDiscount from './pages/Discount/CreateDiscount'
import DiscountList from './pages/Discount/DiscountList'
import BookPageForView from './pages/books/BookPageForView'
import DiscountForEdit from './pages/Discount/DiscountForEdit'
import UsersList from './pages/users/UserList'
function App() {
  return (
    <BrowserRouter>

      {/* <NavBar /> */}
      <div className="d-flex">
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>

            <Route path="/admin/dashboard" element={<WelcomePage />} />

            {/* Welcome Page */}
            <Route path="/" element={<AdminLogin />} />
            <Route path="/books" element={<BookList> </BookList>}></Route>
            <Route path='/add/book' element={<AddBook></AddBook>}></Route>
            <Route path='/book/:id' element={<BookPageForView></BookPageForView>}></Route>
            <Route path='/edit/book/:id' element={<BookPageForEdit></BookPageForEdit>}></Route>
            <Route path='/discount' element={<DiscountList></DiscountList>}></Route> 
            <Route path='/add/Discount' element={<CreateDiscount></CreateDiscount>}></Route>
            <Route path='/view/book/:id' element={<BookPageForView></BookPageForView>}></Route>
            <Route path='/edit/discount/:id' element={<DiscountForEdit></DiscountForEdit>}></Route>
            <Route path='/users' element={<UsersList></UsersList>}></Route>





          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App