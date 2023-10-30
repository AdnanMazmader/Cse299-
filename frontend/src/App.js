import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import GlobalNavbar from "./components/MyNavbar";
import ViewBooks from "./pages/ViewBooks";
import AddBooks from "./pages/AddBooks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/cart";
import SingleBook from "./pages/SingleBook";
import Wishlist from "./pages/Wishlist";
import MyOrder from "./pages/MyOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <GlobalNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veiwbooks" element={<ViewBooks />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="bookdetails/:id" element={<SingleBook />} />
          <Route path="/myorder" element={<MyOrder />} />

          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
