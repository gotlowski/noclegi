import  { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Hotels from './components/Hotels/Hotels';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';

const defaultHotels = [
  {
    id: 1,
    name: 'Pod akacjami',
    city: 'Warszawa',
    rating: 8.3,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat id lorem vitae accumsan.',
    image: ''
  },
  {
    id: 2,
    name: 'Dębowy',
    city: 'Lublin',
    rating: 8.8,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque consequat id lorem vitae accumsan.',
    image: ''
  }
];

function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState('primary');

  useEffect(() =>
    {
      setTimeout(() => {
        setHotels(defaultHotels);
        setLoading(false);
      }, 1000);
    }, []
  );

  const searchHandler = term => {
    const newHotels = [...defaultHotels]
      .filter(x => x.name
          .toLowerCase()
          .includes(term.toLowerCase()));
    setHotels(newHotels);
      }

  const changeTheme = () =>  {
    const newTheme = theme === 'primary' ? 'secondary' :  'primary';
    setTheme(newTheme);
  }

  const header = (
    <Header>
            <Searchbar onSearch={term => searchHandler(term)}/>
            <ThemeButton changeTheme={changeTheme} />
          </Header>
  )
  const content = (
    loading 
    ? <LoadingIcon theme={theme} />
    : <Hotels hotels={hotels} />
  )

  return (
    <AuthContext.Provider 
    value={
      { isAuthenticated: isAuthenticated,
        login: () => {setIsAuthenticated(true)} ,
        logout: () => {setIsAuthenticated(false)}
      }
          }>
    <ThemeContext.Provider value = {{
      color: theme,
      onChange: changeTheme}}>
      <Layout
        header={header}
        menu={<Menu />}
        content={content}
        footer={<Footer />}
      />
    </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
