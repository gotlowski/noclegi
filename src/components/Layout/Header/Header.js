import React from 'react';
import styles from './Header.module.css'
import withMousePosition from '../../../hoc/withMousePosition';

function Header(props) {
    const paralaxStyles = {
        transform: `translate(
            ${props.mouseX /-30}px,
            ${props.mouseY /120}px
        )`
    };
    return (
            <header className={`${styles.header} container`} >
                    <div className={styles.headerImage} style={paralaxStyles}></div>
                    {props.children} 
            </header>
    )
}

export default withMousePosition(Header);