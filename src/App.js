import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  { useEffect, useReducer, useCallback } from 'react';
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
import BestHotel from './components/Hotels/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import LastHotel from './components/Hotels/LastHotel/LastHotel';
import useStateStorage from './hooks/useStateStorage'
import useWebsiteTitle from './hooks/useWebsiteTitle';


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
  useWebsiteTitle('Strona główna');
  const reducer = (state, action) => {
    switch(action.type){
      case 'change-theme':
        return {
          ...state,
          theme: state.theme === 'primary' ? 'warning' :  'primary'
        }
      case 'set-hotels':
        return {
          ...state,
          hotels: action.hotels
        }
      case 'set-loading':
        return {
          ...state,
          loading: action.loading
        }
      case 'login':
        return {
          ...state,
          isAuthenticated: true
        }
      case 'logout':
        return {
          ...state,
          isAuthenticated: false
        }
      default:
        throw new Error('Nie ma akcji: ' + action.type)
    }

  }

  const initialState = {
    hotels: [],
    loading: true,
    isAuthenticated: true,
    theme: 'warning'
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() =>
    {
      setTimeout(() => {
        dispatch({ type: 'set-hotels', hotels: defaultHotels});
        dispatch({ type: 'set-loading', loading: false});
      }, 1000);
    }, []
  );

  const searchHandler = term => {
    const newHotels = [...defaultHotels]
      .filter(x => x.name
          .toLowerCase()
          .includes(term.toLowerCase()));
    dispatch({ type: 'set-hotels', hotels: newHotels});
      }

  const changeTheme = () =>  {
    dispatch({
      type: 'change-theme'
    });
  }

  const getBestHotel = useCallback((options) => {
    if(state.hotels.length < options.minHotels){
      return null;
    }else {
      return state.hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)
      [0];
    }
  }, [state.hotels]);

  const [lastHotel, setLastHotel] = useStateStorage('last-hotel', null);

  const header = (
    <Header>
            <InspiringQuote />
            <Searchbar onSearch={term => searchHandler(term)}/>
            <ThemeButton changeTheme={changeTheme} />
          </Header>
  )

  const bestHotel =  getBestHotel({minHotels: 2}) ? <BestHotel getHotel={getBestHotel} /> : null;

  const openHotel = (hotel) => setLastHotel(hotel);
  const removeLastHotel = () => setLastHotel(null);

  const hotelsList = (
    <>
    {lastHotel ? <LastHotel {...lastHotel} onRemove={removeLastHotel} /> : null}
    { bestHotel }
    <Hotels onOpen={openHotel} hotels={state.hotels} />
    </>
  )

  const hotelsOffers = (
    <>
      <Routes>
        <Route exact={true} path="/" element={hotelsList}/>
        <Route path="/hotel/:id" element={<h1>To jest jakiś hotel</h1>} />
      </Routes>
    </>
  )

  const content = (state.loading ? <LoadingIcon theme={state.theme} /> : hotelsOffers)

  return (
    <Router>
      <AuthContext.Provider 
      value={
        { isAuthenticated: state.isAuthenticated,
          login: () => {dispatch({ type: 'login'})} ,
          logout: () => {dispatch({ type: 'logout'})}
        }
            }>
      <ThemeContext.Provider value = {{
        color: state.theme,
        onChange: changeTheme}}>
        <Layout
          header={header}
          menu={<Menu />}
          content={content}
          footer={<Footer />}
        />
      </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
