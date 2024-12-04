import React,{useState} from 'react'

interface IState{
    count : number
}

interface example{
    name:String
}
const Exapmle: React.FC<example>=({name}) => {
    const [num , setNum] = useState<IState>({
        count : 0
    })
  
  return (
    <div>
{name}
{num.count}
    </div>
  )
}

export default Exapmle