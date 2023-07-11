import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";
import UpdatePage from "./routes/UpdatePage";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import { RestaurantsContextProvider } from "./context/RestaurantsContext.js";

const App = () => {
  return (
   <RestaurantsContextProvider>
      <div className="container">
       
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route
              exact
              path="/restaurants/:id/update"
              element={<UpdatePage/>}
            />
            <Route
              exact
              path="/restaurants/:id"
              element={<RestaurantDetailPage/>}
            />
          </Routes>
        </Router>
      </div>
      </RestaurantsContextProvider>
  );
};

export default App;