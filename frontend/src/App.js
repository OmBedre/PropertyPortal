import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import About from './containers/About'
import Contact from './containers/Contact'
import ListingDetails from './containers/ListingDetails'
import Listings from './containers/Listings'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NotFound from "./components/NotFound";
import { Provider  } from "react-redux";
import store from "./store";


import './sass/main.scss';



const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/listings' element={<Listings />} />
          <Route exact path='/listings/:id' element={<ListingDetails />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='*' element={<NotFound />} />          
        </Routes>
      </Layout>
    </Router>
    </Provider>
  );


export default App;
