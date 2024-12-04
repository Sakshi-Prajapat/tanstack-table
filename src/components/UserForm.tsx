import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

interface Inputs {
    name: string,
    task: string,
}
interface ITodo {
    task : string
    isDone : boolean
}

const UserForm : React.FC = () =>{
    const { register , handleSubmit } = useForm<Inputs>()
    const [isDone , setIsDone] = useState<ITodo>({
        task : "",
        isDone : false
    })
    // @ts-ignore 
    let tododata = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
   
    const onSumbit = (values : Inputs) =>{
        tododata.push(values)
        localStorage.setItem("task", JSON.stringify(tododata))
        console.log(values,isDone)
    }
    return (
        <div>
            <div style={{ width: "200px", }} >
                <form onSubmit={handleSubmit(onSumbit)} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <input type='text' placeholder='Enter name' {...register("name")} style={{ padding: "10px", border: "none", borderRadius: "10px", backgroundColor: "whitesmoke" }} />
                    <input type='text' placeholder='Enter Task' {...register("task")} style={{ padding: "10px", border: "none", borderRadius: "10px", backgroundColor: "whitesmoke" }} />
                    <button style={{ padding: "8px", border: "none", borderRadius: "10px", width: "100px", backgroundColor: "lightblue" }}>Sumbit</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm