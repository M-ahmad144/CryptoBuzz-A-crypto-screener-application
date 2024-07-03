import React from 'react';
import ReactDOM from 'react-dom';
import '../src/output.css'; // Importing the compiled Tailwind CSS file for styling
import reportWebVitals from './reportWebVitals'; // Importing a utility to measure and report web vitals for performance
import {
  createBrowserRouter, // Importing function to create a browser-based router
  RouterProvider, // Importing component to provide the router context to the application
} from "react-router-dom";
import Home from './pages/Home';
import Crypto from './pages/Crypto';
import Trending from './pages/Trending';
import Saved from './pages/Saved';

// Creating a router instance with routes configuration
const router = createBrowserRouter([
  {
    path: '/', // Root path of the application
    element: <Home />, // Component to render when the path is matched
    // use OutLet in Home jsx {parent component} to use childdren components 
    children: [
      {
        path: '/',
        element: <Crypto />
      },
      {
        path: '/trending',
        element: <Trending />
      },
      {
        path: '/Saved',
        element: <Saved />
      }

    ]
  },
]);

// Rendering the root component to the DOM
ReactDOM.render(
  <React.StrictMode>
    {/* Providing the router context to the application */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root') // Targeting the root DOM element to mount the React application
);

// Enabling performance measurement for the application
reportWebVitals(); // This can be used to log or send performance metrics to an analytics endpoint
