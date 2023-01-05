import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import Paraphraser from './components/pages/Paraphraser';
import Reminder from './components/pages/Reminder';
import NotFound from './components/pages/NotFound';
import Shawtawt from './components/pages/Shawtawt';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/paraphrase",
        element: <Paraphraser />,
      },
      {
        path: "/reminders",
        element: <Reminder />,
      },
      {
        path: "/shawtawt",
        element: <Shawtawt />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
