import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Paraphraser from "./components/pages/Paraphraser";
import Reminder from "./components/pages/Reminder";
import NotFound from "./components/pages/NotFound";
import Shawtawt from "./components/pages/Shawtawt";
import EmailPromo from "./components/pages/EmailPromo";
import EmailSend from "./components/pages/EmailSend";
import Onboarding from "./components/pages/Onboarding";
import SocketDisplay from "./components/pages/SocketDisplay";
import Encryption from "./components/pages/Encryption";
import ApiTester from "./components/pages/ApiTester";
import ScreenShoter from "./components/pages/Screenshoter";
import TextEditor from "./components/pages/TextEditor";
import FormikForm from "./components/pages/FormikForm";
import Camera from "./components/pages/Camera";

// * openai-api-key has expired
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      // {
      //   path: '/paraphrase',
      //   element: <Paraphraser />,
      // },

      // {
      //   path: '/emailpromo',
      //   element: <EmailPromo />,
      // },
      // {
      //   path: '/emailsend',
      //   element: <EmailSend />,
      // },
      {
        path: "/shawtawt",
        element: <Shawtawt />,
      },
      {
        path: "/reminders",
        element: <Reminder />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/socketdisplay",
        element: <SocketDisplay />,
      },
      {
        path: "/encryption",
        element: <Encryption />,
      },
      {
        path: "/api-tester",
        element: <ApiTester />,
      },
      {
        path: "/screenshoter",
        element: <ScreenShoter />,
      },
      {
        path: "/text-editor",
        element: <TextEditor />,
      },
      {
        path: "/formik-form",
        element: <FormikForm />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
