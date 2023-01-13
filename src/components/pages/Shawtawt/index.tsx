import { useEffect, useState } from 'react'
import { FaExpandAlt, FaEdit, FaMinus } from "react-icons/fa";
import { ShawtawtItem, ShawtawtProps } from '../../../../types';
// enchancements
// [ ] show edit icon when hovered

interface IProps {
  items: ShawtawtItem[];
  shawtInput?: string;
  setShawtInput?: any;
  submitHandler?: any;
  editHandler?: any;
  deleteHandler?: any;
  editId?: Number | null;
  formatInput?: any;
  setInputPress?: any;
}

const Shawtawt = () => {
  const [modalShow, setModalShow] = useState(false)
  const [shawtInput, setShawtInput] = useState("")
  const [items, setItems] = useState<ShawtawtItem[]>([]);
  const [shawtawtObj, setShawtawtObj] = useState<ShawtawtItem>()
  const [editId, setEditId] = useState<Number | null>(null) // not null then isEditing
  const [inputPress, setInputPress] = useState(null);
  
  useEffect(()=> {
    getItems()
  },[])

  useEffect(()=> {
    displayShawtout(items)
    if(items.length) {
      const intervalId = setInterval(() => {
        // call display every min
        displayShawtout(items)
      }, 1000 * 60)
      return ()=> {
        clearInterval(intervalId)
      }
    }
  },[items]);

  useEffect(()=> {
    if(shawtInput === "") setEditId(null)
  },[shawtInput])

  const sortShawtawt = (props: ShawtawtItem[]) => {
    const timeArr = props.map((item) => {
      const [itemHr, itemMin] = item.time.split(':')
      return {
        ...item,
        hour: Number(itemHr),
        min: Number(itemMin)
      }
    })
    timeArr.sort(itemSorterMin)
    timeArr.sort(itemSorterHr)
    return timeArr
  }

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

  const itemSorterId = (a:any, b:any) => {
    const id1 = a.id;
    const id2 = b.id;
    let comparison = 0;
    if (id1 < id2) {
      comparison = -1;
    } else if (id1 > id2) {
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

  const formatInput = (e:any) => {
    if(inputPress != "Backspace") {
      switch(shawtInput.length) {
      case 0:
        if(Number(e)) {
          if(Number(e) !== 1 && Number(e) !== 2) {
            setShawtInput(`0${e}:`)
          } else {
            setShawtInput(e)
          }
        }
        break;
      case 1:
        if(Number(e)) {
          if(Number(e) < 24) {
            setShawtInput(`${e}:`)
          }
        }
        break;
      case 3:
        if(Number(e[3]) < 6) {
          setShawtInput(e)
        } else if(Number(e[3] == 6)) {
          console.log('haha')
          setShawtInput(`${e}0-`)
        }
        break;
      case 4:
        console.log('hehe', Number(e[4]) )
        if(Number(e[4]) || Number(e[4]) === 0) setShawtInput(`${e}-`)
        break;
      default:
        setShawtInput(e)
        break;
      }
    } else {
      setShawtInput(shawtInput.substring(0,shawtInput.length -1))
    }
  }

  const getItems = () => {
    const shawtItems = localStorage.getItem('shawtawt');
    if(shawtItems) {
      let parsedCart: ShawtawtItem[] = JSON.parse(shawtItems);
      const sortedItems = sortShawtawt(parsedCart)
      setItems(sortedItems)
      return sortedItems
    }
  }

  const displayShawtout = (itemArr: ShawtawtItem[]) => {
    const dateNow = new Date()
    const hours = dateNow.getHours()
    const minutes = dateNow.getMinutes()

    const sortedItems = sortShawtawt(itemArr)
    const filteredItems = sortedItems.filter((item) => hours > item.hour || (hours === item.hour && minutes >= item.min))
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
  const submitHandler = async(e:any) => {
    e.preventDefault();

    const re = new RegExp(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]-[a-zA-Z0-9 ]*$/)
    const check = re.test(shawtInput);
    if(!check) {
      return alert('Not allowed to input special characters')
    }
    
    const textArr = shawtInput.split('-')
    const getHighest = Math.max.apply(Math, items.map(function(o) { return o.id; }))
    const generateId = getHighest > 0 ? getHighest : items.length;

    const newItem = {
      id: typeof editId === "number"  ? editId : generateId + 1,
      time: textArr[0],
      title: textArr[1],
    }

    let itemsArr = []
    if(editId) {
      const newItems = deleteHandler()
      itemsArr=[...newItems, newItem]
      const sortedItems = sortShawtawt(itemsArr)
      setItems(sortedItems)
      localStorage.setItem('shawtawt', JSON.stringify([...newItems, newItem]));
    } else {
      itemsArr=[...items, newItem]
      const sortedItems = sortShawtawt(itemsArr)
      setItems(sortedItems)
      localStorage.setItem('shawtawt', JSON.stringify([...items, newItem]));
    }
    
    setShawtInput("")
  }

  const editHandler = (id: number) => {
    const [editItem] = items.filter((data)=> id === data.id)
    const editText = `${editItem.time}-${editItem.title}`
    setShawtInput(editText)
    setEditId(id)
  }

  const deleteHandler = () => {
    const newItems = items.filter((data)=> editId !== data.id)
    setItems(newItems)
    localStorage.setItem('shawtawt', JSON.stringify(newItems));
    setShawtInput("")
    return newItems
  }

  return (
    <div className='flex text-center relative h-full pb-32 items-center'>
      <h1 className='text-7xl flex-1'>{shawtawtObj?.title ? shawtawtObj?.title : ""}</h1>
      <FaExpandAlt onClick={modalHandler} className={modalShow ? 'expand-btn-active' : 'expand-btn-inactive'} />
      { modalShow ? 
        <ItemModal items={items} 
        submitHandler={submitHandler} 
        shawtInput={shawtInput} 
        setShawtInput={setShawtInput}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        editId={editId}
        formatInput={formatInput}
        setInputPress={setInputPress} /> : null
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
                    <li key={item.id} className='flex items-center p-2'>
                      <p className='flex-1'>{item.time} - {item.title}</p>
                      <span className='cursor-pointer hover:text-gray-400' onClick={()=>props.editHandler(item.id)}>
                        <FaEdit />
                      </span>
                    </li>
                  )
                })}
              </ul>
              <div className='relative'>
                <form onSubmit={e=>props.submitHandler(e)}>
                  <input placeholder='add shawtawt' value={props.shawtInput} 
                  onKeyDown={e=>props.setInputPress(e.key)} 
                  onChange={(e)=>props.formatInput(e.target.value)} 
                  className='w-full p-2 rounded-md capitalize' />
                </form>
                { props.editId && props.shawtInput ? 
                  <span className='absolute top-2 right-4 cursor-pointer hover:text-red-600' onClick={props.deleteHandler}>x</span> : null
                }
              </div>
            </div>
        </div>
    </div>
  )
}


export default Shawtawt 