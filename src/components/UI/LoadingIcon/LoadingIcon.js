import { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

export default function LoadingIcon() {
    const theme = useContext(ThemeContext)
    return(
        <div  className={`spinner-grow text-${theme.color}`} role="status">
            <span className="sr-only"></span>
        </div>        
    )
}
