import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import Home from './components/Home';

interface IProps {
  title: string;
  route: string;
  loc: string;
  setModalShow?: any;
}

const breakPoint = 768;

const SidebarItem = ({ title, route, loc, setModalShow }: IProps) => {
  return(
    <li className={loc === route ? 'bg-gray-700 rounded-lg' : ''}>
      <Link onClick={window.innerWidth >= breakPoint ? undefined : ()=>setModalShow(false)} to={route}>
        <p className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">{title}</p>
      </Link>
    </li>
  )
}

function App() {
  const [modalShow, setModalShow] =  useState(false)
  let location = useLocation();
  const sideBarItems = [
    {
      title: "Paraphraser",
      route: "/paraphrase"
    },
    {
      title: "Reminder",
      route: "/reminders"
    },
    {
      title: "Shawtawt",
      route: "/shawtawt"
    },
    {
      title: "EmailPromo",
      route: "/emailpromo"
    }
  ]

  const checkWinWidth = () => {
    if(window.innerWidth >= breakPoint) {
      setModalShow(true)
    } else {
      setModalShow(false)
    }
  }

  useEffect(() => {
    checkWinWidth()
    window.addEventListener("resize", checkWinWidth);
    return () => {
      window.removeEventListener('resize', checkWinWidth);
    }
  }, [])
  return (
    <div className='h-screen relative'>
      <div className='pb-32 items-center flex'>
        <FaBars onClick={()=>setModalShow(!modalShow)} className='w-10 h-10 p-2 cursor-pointer flex md:hidden' />
      </div>
      
      <div className="h-[calc(100vh-12rem)] flex min-w-[calc(100vw-8rem)] transition-all duration-500 w-screen" aria-label="Sidebar">
        { modalShow ? 
        <div className="absolute md:relative top-10 md:top-0 px-4 py-4 rounded w-full bg-gray-50 dark:bg-gray-800 md:w-[20rem] md:h-[70vh]">
          <ul className="space-y-2">
            {
              sideBarItems?.map((item) => {
                return <SidebarItem key={item.title} title={item.title} route={item.route} loc={location.pathname} setModalShow={setModalShow}/>
              })
            }
          </ul>
        </div> 
        : null
        }
        { window.innerWidth >= breakPoint ?
          <div className="p-4"></div> : null
        }
        <div id="content" className='w-full'>
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
