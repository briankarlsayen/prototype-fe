import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import { CiMaximize1  } from "react-icons/ci";
import { FaExpandAlt  } from "react-icons/fa";
import { ShawtawtItem, ShawtawtProps } from '../../../../types';
// TODO
// [ ] Display shout outs
// [ ] change diplay by predetermined time
// [ ] save shout outs on local storage
// [ ] use modal for the form

interface IProps {
  items: ShawtawtItem[];
  shawtInput?: string;
  // setShawtInput?: (value: string | ((prevVar: string) => string)) => void;
  setShawtInput?: any;
  submitHandler?: any;
  // submitHandler?: (s:string) => void;
}

const Shawtawt = () => {
  const [modalShow, setModalShow] = useState(false)
  const [shawtInput, setShawtInput] = useState("")
  const [items, setItems] = useState<ShawtawtItem[]>([]);
  const [shawtawtObj, setShawtawtObj] = useState<ShawtawtItem>()
  const itemArr: ShawtawtItem[] = [
    {
      id: 1,
      time: '13:20',
      title: 'Display shout outs 1'
    },
    {
      id: 2,
      time: '11:00',
      title: 'Display shout outs 2'
    },
    {
      id: 3,
      time: '13:00',
      title: 'Display shout outs 3'
    },
    {
      id: 4,
      time: '13:40',
      title: 'Display shout outs 3'
    },
    {
      id: 5,
      time: '11:10',
      title: 'Display shout outs 3'
    },
    {
      id: 6,
      time: '17:10',
      title: 'Display shout outs 4'
    },
    {
      id: 7,
      time: '17:00',
      title: 'Display shout outs 5'
    },
  ]
  

  useEffect(()=> {
    getItems()
  },[])

  useEffect(()=> {
    displayShawtout(items)
  },[items])

  const getItems = () => {
    setItems(itemArr)
    displayShawtout(itemArr)
  }

  // TODO sort time
  // TODO show most recent

  const itemSorterHr = (a:any, b:any) => {
    const hour1 = a.hour;
    const hour2 = b.hour;
    let comparison = 0;
    if (hour1 < hour2) {
      comparison = -1;
    } else if (hour1 > hour2) {
        comparison = 1;
    }
    return comparison;
  }

  const itemSorterMin = (a:any, b:any) => {
    const min1 = a.min;
    const min2 = b.min;
    let comparison = 0;
    if (min1 < min2) {
      comparison = -1;
    } else if (min1 > min2) {
        comparison = 1;
    }
    return comparison;
  }


  const displayShawtout = (itemArr: ShawtawtItem[]) => {
    const dateNow = new Date()
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()

    // extract hrs and min from array
    const timeArr = itemArr.map((item) => {
      const [itemHr, itemMin] = item.time.split(':')
      return {
        ...item,
        hour: Number(itemHr),
        min: Number(itemMin)
      }
    })
    timeArr.sort(itemSorterMin)
    timeArr.sort(itemSorterHr)
    const filteredItems = timeArr.filter((item) => hours > item.hour || (hours === item.hour && minutes >= item.min))
    console.log('filteredItems', filteredItems)
    const idx = filteredItems.map((item) => {
      if(hours >= item.hour) {
        return item.id
      }
    })
    const latestIdx = idx[idx.length - 1]
    const [display] = itemArr.filter((item)=>item.id === latestIdx)
    setShawtawtObj(display)
  }

  const modalHandler = () => {
    setModalShow(!modalShow)
  }

  // input form 10:00-title name
  const submitHandler = (e:any) => {
    e.preventDefault();
    const textArr = shawtInput.split('-')
    console.log('textArr', textArr)
    const newItem = {
      id: items.length + 1,
      time: textArr[0],
      title: textArr[1],
    }
    setItems([...items, newItem])
    // setShawtInput("")
  }

  return (
    <div className='flex text-center relative'>
      <h1 className='text-7xl flex-1'>{shawtawtObj?.title}</h1>
      <FaExpandAlt onClick={modalHandler} className='w-10 h-10 p-1 rounded-md border border-white cursor-pointer fixed bottom-10 right-10' />
      { modalShow ? 
        <ItemModal items={items} submitHandler={submitHandler} shawtInput={shawtInput} setShawtInput={setShawtInput} /> : null
      }
    </div>
  )
}

const ItemModal = (props: IProps) => {
  return (
    <div className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0">
        <div className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
            <div className="relative py-6 px-2 md:px-6 shadow-md bg-[#2d3848]">
              <ul className='text-justify max-h-80 overflow-auto'>
                { props.items.map((item: ShawtawtItem) => {
                  return (
                    <li key={item.id} className='items-center py-2'>
                      {item.time} - {item.title}
                    </li>
                  )
                })}
              </ul>
              <div>
                <form onSubmit={e=>props.submitHandler(e)}>
                  <input placeholder='add shawtawt' value={props.shawtInput} onChange={(e)=>props.setShawtInput(e.target.value)} className='w-full p-2 rounded-md capitalize' />
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}


export default Shawtawt