import { BrowserRouter,Navigate,Route,Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/LoginPage";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { FakeAuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";


export default function App(){
  
  return (
    <FakeAuthProvider>
    <CitiesProvider>
    <BrowserRouter>
    <Routes>
      <Route index element={<HomePage/>}/>
      <Route path="pricing" element={<Pricing/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
      <Route index element={<Navigate replace to={"cities"}/>} />
        <Route path="cities" element={<CityList/>} ></Route>
        <Route path="cities/:id" element={<City/>}/>
        <Route path="countries" element={<CountryList/>}></Route>
        <Route path="form" element={<Form/>}></Route>
      </Route>
      
      <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </CitiesProvider>
    </FakeAuthProvider>)
}