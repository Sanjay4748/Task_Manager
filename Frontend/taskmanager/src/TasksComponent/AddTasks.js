function Addtask(){

    function addtask(){
        console.log("hi")
    }
    

    return(<div>
        <form onSubmit={addtask} >
            <div>
                <label>
                    Taskname
                </label>
                <input type="text" id="taskname" />
            </div>
        </form>
    </div>);
}

export default Addtask