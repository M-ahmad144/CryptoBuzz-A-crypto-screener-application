import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
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
import CryptoDataDetails from './components/CryptoDataDetails';

// Creating a router instance with routes configuration
const router = createBrowserRouter([
  {
    path: '/', // Root path of the application
    element: <Home />, // Component to render when the path is matched
    // use Outlet in Home.jsx {parent component} to use children components
    children: [
      {
        path: '/',
        element: <Crypto />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDataDetails /> // Component to render when the specific coin ID is matched
          }
        ]

      },

      {
        path: '/trending',
        element: <Trending />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDataDetails /> // Component to render when the specific coin ID is matched
          }
        ]
      },
      {
        path: '/saved',
        element: <Saved />,
        children: [
          {
            path: ":coinId",
            element: <CryptoDataDetails /> // Component to render when the specific coin ID is matched
          }
        ]
      }
    ]
  },
]);

// Creating the root for the application
const container = document.getElementById('root'); // Targeting the root DOM element to mount the React application
const root = ReactDOM.createRoot(container);

// Rendering the root component to the DOM
root.render(
  // Directly providing the router context to the application
  <RouterProvider router={router} />
);

// Enabling performance measurement for the application
reportWebVitals(); // This can be used to log or send performance metrics to an analytics endpoint
