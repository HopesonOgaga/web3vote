import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/home";
import Final from "./components/final";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="final" element={<Final></Final>}></Route>
    </Route>
  )
);
// this should workgit 
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
