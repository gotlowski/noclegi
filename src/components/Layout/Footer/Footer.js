
import  React, { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

const Footer = () => {
  const theme = useContext(ThemeContext);
  return(
        <div className={`text-center m-3 text-${theme.color}`}> Noclegi 2022</div>
  )  
}

export default Footer;