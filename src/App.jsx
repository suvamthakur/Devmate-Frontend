import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Body from "./components/Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { Provider } from "react-redux";
import appStore from "./store/appStore";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
import Requests from "./pages/Requests";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
