import { useState } from "react";

function Addtask(){

    const [taskname,Settaskname]=useState("")
    function addtask(){
        console.log(taskname);
    }
    
    return(<div>
        <form onSubmit={addtask} >
            <div>
                <label>
                    Taskname
                </label>
                <input type="text" id="taskname" onChange={(e)=>{Settaskname(e.target.value)}} />
            </div>
            <div>
                <label>
                    Task 
                </label>
                <input type="text" />
            </div>
        </form>
    </div>);
}

export default Addtask