import { useState, useEffect } from 'react'
import './App.css'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setShowfinished] = useState(false)

  useEffect(() => {
    let stringTodo = localStorage.getItem("todos")
    if (stringTodo) {
      let Todos =JSON.parse(localStorage.getItem("todos"))
      setTodos(Todos)
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // function Savels() {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }

  function showfin() {
    setShowfinished(!showfinished);
  }
  
  
  const HandelAdd = () => {
     setTodos([...todos,{id: uuidv4(), todo, isComplit:false}])
      setTodo("")
  }

  const HandelDelet = (id) => { 
    const userConfirmed = window.confirm("Are you sure you want to delete this?");
    if (userConfirmed) { 
  let Newtodos=todos.filter(item => {
    return item.id !== id;
  })
  setTodos(Newtodos)
  setTimeout(() => {
    localStorage.setItem("todos", JSON.stringify(Newtodos));
  }, 100);
 }
  }

  const HandelEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id )
    setTodo(t[0].todo)
    let Newtodos=todos.filter(item => {
      return item.id !== id;
    })
    setTodos(Newtodos)
  }

  const HandelChange = (e) => {
    setTodo(e.target.value)
  }

  const HandelCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
  let Newtodos=[...todos]
  {Newtodos[index].isComplit=!Newtodos[index].isComplit};
  setTodos(Newtodos)
  }
  
  return (
    <div className='flex justify-center bg-[#042929] items-center h-screen'>
    
    <div className='bg-[#71C9CE] h-[620px] w-[98vw] sm:w-[510px] rounded-2xl shadow-lg  text-white'>
     <h1 className='text-3xl font-semibold flex justify-center mt-3 text-[#05445E]'>TO-DO LIST</h1>
     <div className="h-[540px] w-[90vw] sm:w-[470px] m-auto bg-[#1b549a] mb-[20px] mt-[10px] pb-5 rounded-2xl">
      <h1 className='text-semibold m-auto flex justify-center'></h1>
      <div className="flex gap-3 justify-center mt-3">
        <input onChange={HandelChange} value={todo} className='placeholder-gray-500 pl-4 pb-1 bg-[#A6E3E9] rounded-lg w-[60vw] h-[34px] sm:w-[370px] text-gray-700' type="text" placeholder='Add To-do'/>
        <button onClick={HandelAdd} disabled={todo.length<=3} className='bg-[#05445E] disabled:bg-blue-600 text-white rounded-lg p-1 w-[50px] cursor-pointer'>ADD</button>
      </div>
      <input onChange={showfin} className='ml-3 mt-3 w-7' checked={showfinished} type="checkbox"/>Complit Todo

       <div className='flex justify-center items-center mt-1 gap-1'>
       <div className='w-[188px] h-[0.8px] bg-white mt-1.5'></div>
        <h2 className='text-lg'>Todos</h2>
        <div className='w-[188px] h-[0.8px] bg-white mt-1.5'></div>
       </div>
       
       <div className='overflow-auto custom-scrollbar  h-[420px]'>
       {todos.length ===0 && <div className=' flex justify-center mt-45 text-xl text-gray-400'>No To-dos Here</div>}
       {todos.map(item =>{
            return (showfinished || !item.isComplit) && <div key={item.id} className='flex justify-center items-center gap-1 border m-auto mt-4 rounded-lg w-[80vw] sm:w-[425px] bg-[#042929] min-h-14 border-gray-300'>
        <div className='flex items-cente w-[60vw] ml-2 sm:w-[300px] min-h-9 gap-4'>
          <input name={item.id} onChange={HandelCheckbox} checked={item.isComplit} type="checkbox" />
          <h2 className={`${item.isComplit? "line-through":""} mt-1`}>{item.todo}</h2>
        </div>
        <div className='flex justify-center mr-2 gap-2'>
          <button onClick={(e)=>HandelEdit(e, item.id)} className='bg-[#05445E] p-2 rounded-lg cursor-pointer'><FaEdit/></button>
          <button name={item.id} onClick={()=>HandelDelet(item.id)} className='bg-[#05445E] p-2 rounded-lg cursor-pointer'><RiDeleteBin6Line /></button>
        </div>
       </div>
      })}
      </div>

     </div>
    </div>

    </div>
  )
}

export default App
