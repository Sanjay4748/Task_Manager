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
            <Link to='/home' >
                View Task
            </Link>
            <Link to='/home' >
                Add Task
            </Link>
            <Link to='/home ' >
                Update Task
            </Link>
            <Link to='/home' >
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