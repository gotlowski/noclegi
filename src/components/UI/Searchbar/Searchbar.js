import React, { useState, useContext, useEffect, useRef } from 'react';
import ThemeContext from '../../../context/themeContext'; 
import { useNavigate as useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
 
function Searchbar(props) {   
    const inputRef = useRef(null);
    const [term, setTerm] = useState('')
    const updateTerm = (e) => {
        setTerm(e.target.value);
    
    }
     const history = useHistory();
    // const theme = useContext(ThemeContext);
    const theme = useSelector(state => state.theme);
    const search = () => {
          history(`/wyszukaj/${term}`);
    }

    return (
        <div className="d-flex">
            <input 
                value={term}
                onChange={updateTerm}
                onKeyDown={e=> console.log(e.key === 'Enter' && search())}
                className = "form-control"
                placeholder = "Szukaj..."
                type="text"/>        
            <button onClick={search} className={`ml-2 btn btn-${theme}`}>Szukaj</button>            
        </div>
    )
}

export default Searchbar;