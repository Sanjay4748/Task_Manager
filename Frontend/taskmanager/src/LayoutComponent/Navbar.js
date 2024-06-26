import { Link } from 'react-router-dom';
import styles from './Layout.module.css'

function Navbar(){

    function Logout(){
        localStorage.clear();
    }

    return(
        <div className={styles.navbar}>
            <Link to='/home'>
                Home
            </Link>
            <Link to='/alltasks' >
                View Task
            </Link>
            <Link to='/addtask' >
                Add Task
            </Link>
            <Link to='/updatetask' >
                Update Task
            </Link>
            <Link to='/deletetask' >
                Delete Task
            </Link>
            <Link to='/profile' >
                Profile
            </Link>
            <Link style={{"float":"right"}} onClick={Logout} to='/login' >
                Logout
            </Link>
        </div>
    );
}

export default Navbar;