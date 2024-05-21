import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const ToDoList = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("todoList");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(()=> {
        localStorage.setItem("todoList", JSON.stringify(tasks));
    } , [tasks])
    const [newTask, setNewTask] = useState("");
    // const [show, setShow] = useState(false)


    const handleSubmit = (e) => {
        e.preventDefault();
     addTask(newTask);
     setNewTask('')
    }

    const DeleteTask = (id) => {
        setTasks(tasks.filter(todo => todo.id !== id))
    }
     
    const addTask = (todo) => {
        if(newTask.trim() !== ""){
            let Newtodo = { task: todo, id: Math.random(), completed: false, isEditing: false};
            setTasks([...tasks, Newtodo])

        }else{
            alert("Please input is empty")
        }
        
    }

    const toggleComplete = (id) => {
        setTasks(tasks.map(todo => todo.id === id ? {...todo, completed: !todo.completed } : todo ))
    }

    const editTask = (id) => {
         setTasks(tasks.map(task=> task.id === id ? {...task, isEditing: !task.isEditing, id: id, completed: false}: task))

        // let task  = tasks.filter(todo => todo.id === id)
        // console.log(task)
        // task[0].isEditing = true
        
        // setTasks([...tasks, task])
        
    }
   
    const addUpdate = (updatedTask, id) => {
      setTasks(tasks.map(task => task.id === id ? {...task, task: updatedTask, isEditing: !task.isEditing}: task))
    }

    return (
    <div className="TodoWrapper">
        <h1>Get Things Done!</h1>

        <form onSubmit={handleSubmit}>
            <input type="text"
             placeholder="Write your task here..."
              onChange={(e)=> setNewTask(e.target.value)} 
              value={newTask}
              className="mainInput"/>
            <button type= "submit" className="addBtn">Add Task</button>
        </form>

        <div className="Todo">
        {tasks.map((task, index)=>
        task.isEditing ? (
            <EditTask addUpdate={addUpdate} task={task} key={index}/>
             
        ):(
            <Todo task={task} key={index} toggleComplete={toggleComplete} DeleteTask={DeleteTask} editTask={editTask} />
        )
    )}
        </div>
      
    </div>
    )
}



export const Todo = ({task, toggleComplete, DeleteTask, editTask}) => {
    return(
        <div className="task">

            <p onClick={()=> toggleComplete(task.id)} className={`${task.completed ? "completed": ''} `}>{task.task}</p>
            <div>
                <FontAwesomeIcon icon={faPenToSquare} onClick={()=> editTask(task.id)}  className="updateBtn"/>
                <FontAwesomeIcon icon={faTrash} onClick={()=> DeleteTask(task.id)}  className="deleteBtn"/>
             {/* <button className="deleteBtn" >Delete</button>
             <button className="updateBtn" >Update</button> */}
            </div>
        </div>
    )
}



export const EditTask = ({addUpdate, task}) => {
    const [newTask, setNewTask] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();
     addUpdate(newTask, task.id);
     setNewTask('')
    }

    return (
    <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Update Task" onChange={(e)=> setNewTask(e.target.value)} value={newTask} className="mainInput"/>
            <button type= "submit" className="addBtn">Add Update</button>
     </form>
    )


}
