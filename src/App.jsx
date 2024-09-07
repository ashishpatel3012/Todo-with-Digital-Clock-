import { useEffect, useState } from "react";
import "./App.css";
import { MdCheck } from "react-icons/md";
import { MdDelete } from "react-icons/md";

  

function App() {
const todokey = "reactTodo"
  
  const [inputValue, setInputValue] = useState("");
  
  const[task, setTask]=useState(()=>{
    const rawTodo = localStorage.getItem(todokey)
    if(!rawTodo)return [];
    return JSON.parse(rawTodo)
  })


  const[dateTime, setDateTime]=useState("");


  function handleInputChange(value) {
    setInputValue(value);
  }
  const handleFormSubmit = (event)=>{
    event.preventDefault()

       if(!inputValue)return;
       if(task.includes(inputValue)) return(setInputValue(""));

       setTask((prevTask)=>[...prevTask, inputValue])
       setInputValue("");
  }


  // -------------Date and time---------------------------
  
  useEffect(() => {
    
    const interval = setInterval(() => {
      const now = new Date();
      const formettedDate = now.toLocaleDateString();
      const formettedTime = now.toLocaleTimeString();
    
      setDateTime(`${formettedDate}- ${formettedTime}`)
    
     }, 1000);
  
    return () => {
      clearInterval(interval);
    }
  }, [])
  

  // add data on localStorage
  localStorage.setItem(todokey,JSON.stringify(task));

  // HandleDeleteTodo function
  
  const handleDeleteTodo = (value)=>{
    console.log(task);
    console.log(value);
    const updatedTask = task.filter((curTask) => curTask != value);
    setTask(updatedTask)
    
  }
 
  const handleClearAll = ()=>{
    setTask([]);
  }

  return (
    <>
      <section className="todo-box">
        <header>
          <h1>TODO-APP</h1>
          <h2 className="date-time">{dateTime}</h2>
        </header>

        <section className="form">
          <form onSubmit={handleFormSubmit}>
            <div>
              <input
                type="text"
                value={inputValue}
                className="todo-input"
                placeholder="enter task..."
                autoComplete="off"
                onChange={(event)=>{handleInputChange(event.target.value)}}
              />
            </div>
            <div>
              <button className="add-btn" type="submit">Add Task</button>
            </div>            
          </form>
        </section>

        <section className="myUnorderList">
          <ul>
            {task.map((curTask, index) => {
              return(
                <li key={index}>
                  <span>{curTask}</span>
                  <div className="byn-box">
                  <button className="check-btn"><MdCheck /></button>
                  <button className="delete-btn" onClick={()=> handleDeleteTodo(curTask)}><MdDelete /></button>

                  </div>
                  
                </li>
                
              )              
            })}
            <section>
            <button  className="clear-btn" onClick={handleClearAll}>Clear All</button>
            </section>
          </ul>

        </section>
      </section>
    </>
  );
}

export default App;
