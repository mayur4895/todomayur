import React, { useState,useEffect } from 'react'
 

const gettodo = ()=>{
         let tododata = localStorage.getItem("todos");
         if(tododata){
        return JSON.parse(localStorage.getItem("todos"));
         }else{
          return[];
         }
}

 
const Todo = () => { 
  const [InputData ,setInputData] = useState("");
  const [item ,setitem] = useState(gettodo()); 
  const [togglesubmit ,settogglesubmit] = useState(true); 
  const [isedittodo ,setisedittodo] = useState(null); 
  const [error ,seterror] = useState(''); 

 const addtodo = ()=>{ 
if (!InputData) {
    let errors = "All Inputes Are Required!";
    seterror(errors);
}else if(InputData && !togglesubmit){
  seterror('');
   setitem(
    item.map((cur)=>{
      if(cur.id === isedittodo){
        return { ...cur,name:InputData,}
      }
      return cur; 
     
    }) 
     
   )
   seterror("");
   settogglesubmit(true)
   setInputData('');
   setisedittodo(null);
   
} else {
  const alltododata = { id:new Date().getTime().toString(), name:InputData }
  setitem([ alltododata,...item,]);
  setInputData('');
}
 }

 const deletetodo = (id)=>{
   const newtododata = item.filter((cur)=>{
    return  cur.id !== id;
   })
   setitem(newtododata);
 }


 const edittodo = (id)=>{
 const newedittodo =  item.find((cur)=>{
   return  cur.id === id;
  }) 
   settogglesubmit(false)
    setInputData(newedittodo.name);
    setisedittodo(id);
    
}

 useEffect(() => { 
  localStorage.setItem("todos",JSON.stringify(item))
 },[item])
 

  return ( 
     <>
<section className='section todo'>
<div className='container'>
    <div className='todo_container'> 
    <div className='content'>
   <div>
   <h3 className='title flex'><i class="ri-apps-2-fill"></i>Todo app</h3><br></br>
        <span className='sub_title flex'>What is your plan Today <i class="ri-apps-line"></i></span>
   </div>
     <span className={error?'error':'none error'}>{error}</span> 
   <form className='form'>
    <input placeholder='Create new list' name="todo" value={InputData} onChange={(e)=>setInputData(e.target.value)} required  ></input>
  
  {
    togglesubmit ?  <i class="ri-add-fill" onClick={addtodo}></i> :<i class="ri-pencil-line icon"onClick={addtodo}></i> 
  }
    
   </form> 
     <ul className='todo_List'>    
  {
    item.map((cur,index)=>{
      return(
        <li className='todo_item flex_space' key={cur.id}>
        <a className='todo_link flex' href='#'><i class="ri-checkbox-circle-line icons"></i>{cur.name}</a>
       <div className='flex'>
       <i class="ri-pencil-line icon"onClick={()=>edittodo(cur.id)}></i> 
       <i class="ri-delete-bin-line icon" onClick={()=>deletetodo(cur.id)}></i>  
       </div>
         </li>  
      );
    })

  }  
     </ul> 
    </div>
    </div> 
    </div>
</section>
     </>
  )
}

export default Todo