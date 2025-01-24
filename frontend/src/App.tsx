import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  Dashboard,
  LogIn,
  Shop,
  ProductDetails,
  Cart,
  MyAccount,
  Checkout,
  SignUp,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/shop/:category/:product" element={<ProductDetails />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/account/:userName" element={<MyAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
