import styles from './Layout.module.css'

function Navbar(){

    function Logout(){
        localStorage.clear();
    }

    return(
        <div className={styles.navbar}>
            <a href='/home'>
                Home
            </a>
            <a href='/home' >
                View Task
            </a>
            <a href='/home' >
                Add Task
            </a>
            <a href='/home ' >
                Update Task
            </a>
            <a href='/home' >
                Delete Task
            </a>
            <a href='/profile' >
                Profile
            </a>
            <a style={{"float":"right"}} onClick={Logout} href='/login' >
                Logout
            </a>
        </div>
    );
}

export default Navbar;