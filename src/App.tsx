import Paraphraser from './components/pages/Paraphraser'
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './components/Home';
const SidebarItem = ({ title, route }: any) => {
  return(
    <li >
      <Link to={route}>
        <p className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{title}</p>
      </Link>
    </li>
  )
}


function App() {
  let location = useLocation();
  const sideBarItems = [
    {
      title: "Paraphraser",
      route: "paraphrase"
    },
    {
      title: "Reminder",
      route: "reminders"
    },
    {
      title: "Shawtawt",
      route: "shawtawt"
    }
  ]

  return (
    <div className='mt-32'>
      <div className="w-screen flex min-w-[calc(100vh-8rem)]" aria-label="Sidebar">
        <div className="px-3 py-4 overflow-y-auto rounded bg-gray-50 dark:bg-gray-800 mx-4 w-[20rem] max-h-[40rem]">
          <ul className="space-y-2">
            {
              sideBarItems?.map((item) => {
                return <SidebarItem key={item.title} title={item.title} route={item.route} />
              })
            }
          </ul>
        </div>
        <div className='w-full'>
          { location.pathname === "/" ?
            <Home /> :
            <Outlet />
          }
        </div>
      </div>
    </div>
  )
}

export default App
