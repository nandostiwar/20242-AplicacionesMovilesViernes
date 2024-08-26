import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import vehicles from './data/vehicles.js'
import VehicleView from './views/VehicleView.jsx'

const routes = [
  {
    path:"/",
    element:<App/>,
  },
];

vehicles.forEach((vehicles) =>{
  routes.push({
    path:vehicles.name,
    element: <VehicleView vehicle={vehicles}/>,
  });
});
const router = createBrowserRouter(routes);

/*
const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  }

  {
    path:"car",
    element:<div>Car Page</div>
  }
  */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
