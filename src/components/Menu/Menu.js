import React from 'react';
import styles from './Menu.module.css'
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

function Menu() {
    // const auth = useContext(AuthContext);
    const [auth, setAuth] = useAuth();
    const login = (e) => {
        e.preventDefault();
        setAuth(true);
    };
    const logout = (e) => {
        e.preventDefault();
        setAuth(false);
    };
    return (
        <div className= {`${styles.menuContainer} breadcrumb`}>
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <NavLink 
                        className={({ isActive }) => isActive ? undefined : styles.menuItemInactive}
                        to="/">Home
                    </NavLink>
                </li>
                {auth ?  
                   (
                    <>
                        <li className={styles.menuItem}>
                            <NavLink 
                                className={({ isActive }) => isActive ? undefined : styles.menuItemInactive}
                                to="/profil" >Mój profil
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <a className={styles.a} href="#" onClick={logout}>Wyloguj</a> 
                        </li>
                    </> 
                    ) : (     
                    <li className={styles.menuItem}>
                        <a className={styles.a} href="#" onClick={login}>Zaloguj</a>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Menu;