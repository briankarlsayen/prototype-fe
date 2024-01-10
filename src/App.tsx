import { Outlet, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaBars, FaTools } from "react-icons/fa";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import useColorMode from "./components/hooks/useColorMode";
import { FaSun, FaMoon } from "react-icons/fa";

interface IProps extends SidebarProps {
  // title: string;
  // route: string;
  loc: string;
  setModalShow?: any;
  // description: string;
}

interface SidebarProps {
  title: string;
  route: string;
  description: string;
  ongoing?: boolean;
}

const breakPoint = 768;

const SidebarItem = ({
  title,
  route,
  loc,
  setModalShow,
  description,
  ongoing,
}: IProps) => {
  return (
    <li
      className={
        loc === route ? "dark:bg-gray-500 rounded-lg w-full bg-gray-400" : ""
      }
    >
      <Link
        onClick={
          window.innerWidth >= breakPoint
            ? undefined
            : () => setModalShow(false)
        }
        to={route}
      >
        <p
          data-tip={description}
          className="tooltip flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer"
        >
          {title}
          {ongoing && (
            <span className="pl-2 text-red-400">
              <FaTools />
            </span>
          )}
        </p>
      </Link>
    </li>
  );
};

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [colorMode, setColorMode] = useColorMode();
  let location = useLocation();

  // * openai-api-key has expired
  const sideBarItems: SidebarProps[] = [
    // {
    //   title: "Paraphraser",
    //   route: "/paraphrase",
    //   description: "rephrase paragraph using ai",
    // },
    // {
    //   title: "EmailPromo",
    //   route: "/emailpromo",
    //   description: "create an email message with given settings using ai",
    // },
    // {
    //   title: "EmailSend",
    //   route: "/emailsend",
    //   description: "verify email address and send email",
    // },
    {
      title: "Reminder",
      route: "/reminders",
      description: "to be cont.",
    },
    {
      title: "Shawtawt",
      route: "/shawtawt",
      description: "show messages based on timestamp",
    },

    {
      title: "Onboarding",
      route: "/onboarding",
      description: "multi step form",
    },
    {
      title: "SocketDisplay",
      route: "/socketdisplay",
      description: "socket displaying",
    },
    {
      title: "Encryption",
      route: "/encryption",
      description: "encrypt text",
    },
    {
      title: "ApiTester",
      route: "/api-tester",
      description: "test api routes",
    },
    {
      title: "Screenshoter",
      route: "/screenshoter",
      description: "screen a website",
    },
    {
      title: "Text Editor",
      route: "/text-editor",
      description: "write text using Editor.js",
    },
    {
      title: "Formik Form",
      route: "/formik-form",
      description: "form using formik, yup, and MUI v5",
    },
    {
      title: "Camera",
      route: "/camera",
      description: "camera for mobile and desktop use",
    },
  ];

  const checkWinWidth = () => {
    if (window.innerWidth >= breakPoint) {
      setModalShow(true);
    } else {
      setModalShow(false);
    }
  };

  useEffect(() => {
    checkWinWidth();
    window.addEventListener("resize", checkWinWidth);
    return () => {
      window.removeEventListener("resize", checkWinWidth);
    };
  }, []);
  return (
    <div className="min-h-screen h-full relative dark:bg-gray-700 bg-gray-100 overflow-x-hidden">
      <div className="pb-32 items-center flex w-full">
        <FaBars
          onClick={() => setModalShow(!modalShow)}
          className="w-10 h-10 p-2 cursor-pointer flex md:hidden"
        />
        <div className="flex-1"></div>

        <button
          onClick={() => setColorMode(colorMode === "light" ? "dark" : "light")}
          className="custom-btn-bg flex-row-reverse float-right m-2 mr-8"
        >
          {colorMode === "light" ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div
        className="h-full min-h-[calc(100vh-12rem)] flex min-w-[calc(100vw-8rem)] transition-all duration-500 w-screen"
        aria-label="Sidebar"
      >
        {modalShow ? (
          <div className="absolute md:relative top-10 md:top-0 px-4 py-4 rounded w-full bg-gray-50 dark:bg-gray-800 md:w-[16rem] md:h-[70vh] shadow-md z-50">
            <ul className="space-y-2 ">
              {sideBarItems?.map((item) => {
                return (
                  <SidebarItem
                    key={item.title}
                    title={item.title}
                    route={item.route}
                    loc={location.pathname}
                    setModalShow={setModalShow}
                    description={item.description}
                    ongoing={item.ongoing}
                  />
                );
              })}
            </ul>
          </div>
        ) : null}
        {window.innerWidth >= breakPoint ? <div className="p-4"></div> : null}
        <div id="content" className="w-full px-8 mb-8">
          {location.pathname === "/" ? <Home /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default App;
