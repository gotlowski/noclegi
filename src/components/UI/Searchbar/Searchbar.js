import React, { useState, useContext } from 'react';
import ThemeContext from '../../../context/themeContext'; 

function Searchbar(props) {
    const search = () => {
        props.onSearch(term);
    }
    const [term, setTerm] = useState('')
    const updateTerm = (e) => {
        setTerm(e.target.value);
    }
    const theme = useContext(ThemeContext)
    return (
        <div className="d-flex">
            <input 
                value={term}
                onChange={updateTerm}
                onKeyDown={e=> console.log(e.key === 'Enter' && search())}
                className = "form-control"
                placeholder = "Szukaj..."
                type="text"/>        
            <button onClick={search} className={`ml-2 btn btn-${theme.color}`}>Szukaj</button>            
        </div>
    )
}

export default Searchbar;