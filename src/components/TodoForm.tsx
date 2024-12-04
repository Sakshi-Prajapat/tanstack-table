import React,{useState} from 'react'
import { set } from 'react-hook-form'

type  IState = {
  name: string,
  task: string,
  isDone : boolean
}

export const TodoForm : React.FC = () => {
  const [data , setData] = useState<IState>({
    name:"",
    task:"",
    isDone : false
  })
 // @ts-ignore 
 let tododata = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : [];
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    event.preventDefault();

    const { name, value } = event.target;
    setData((values) => ({
      ...values,
      [name]: value,
      
    }));
  }
  const handleSumbit  = (event: React.FormEvent) =>{
    event.preventDefault()
    tododata.push(data)
    localStorage.setItem("task", JSON.stringify(tododata))
    console.log(data)
    
}
  return (
    <div >
    <div style={{  display: "flex" ,  justifyContent: "center" , marginTop : "20px"}} >
                <form onSubmit={handleSumbit}  style={{ width:"400px", display: "flex", flexDirection: "column", gap: "8px" , alignItems:"center", backgroundColor: "lightblue" , borderRadius : "10px" , padding : "10px"}}>
                    <input type='text' name='name' onChange={handleInputChange} placeholder='Enter name' value={data.name} style={{ padding: "10px", border: "none", borderRadius: "10px", backgroundColor: "whitesmoke" }} />
                    <input type='text' name='task' onChange={handleInputChange} placeholder='Enter Task' value={data.task} style={{ padding: "10px", border: "none", borderRadius: "10px", backgroundColor: "whitesmoke" }} />
                    <button style={{ padding: "8px", border: "none", borderRadius: "10px", width: "100px", backgroundColor: "blanchedalmond", fontWeight : "bold" }}>Sumbit</button>
                </form>
            </div>
            <div>
              
            </div>
    </div>
  )
}
