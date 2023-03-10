import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Paraphraser from './components/pages/Paraphraser';
import Reminder from './components/pages/Reminder';
import NotFound from './components/pages/NotFound';
import Shawtawt from './components/pages/Shawtawt';
import EmailPromo from './components/pages/EmailPromo';
import EmailSend from './components/pages/EmailSend';
import Onboarding from './components/pages/Onboarding';
import SocketDisplay from './components/pages/SocketDisplay';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/paraphrase',
        element: <Paraphraser />,
      },
      {
        path: '/shawtawt',
        element: <Shawtawt />,
      },
      {
        path: '/emailpromo',
        element: <EmailPromo />,
      },
      {
        path: '/emailsend',
        element: <EmailSend />,
      },
      {
        path: '/reminders',
        element: <Reminder />,
      },
      {
        path: '/onboarding',
        element: <Onboarding />,
      },
      {
        path: '/socketdisplay',
        element: <SocketDisplay />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
