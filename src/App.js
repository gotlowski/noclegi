import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  { useReducer } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import {reducer, initialState} from  './reducer';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import ReducerContext from './context/reducerContext';
import Home from './pages/Home/Home';
import Hotel from './pages/Hotel/Hotel';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import MyHotels from "./pages/Profile/MyHotels";
import ProfileDetails from "./pages/Profile/ProfileDetail";
import Notfound from './pages/404/404';
import Login from './pages/Auth/Login/Login';

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
  const [state, dispatch] = useReducer(reducer, initialState);

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

  const header = (
    <Header>
            <InspiringQuote />
            <Searchbar onSearch={term => searchHandler(term)}/>
            <ThemeButton changeTheme={changeTheme} />
          </Header>
  )

  const content = (
    <>
      <Routes>
        <Route exact={true} path="/" element={<Home />}/>
        <Route path="/hotele/:id" element={<Hotel />} />
        <Route path="/wyszukaj/:term" element={<Search />} />
        <Route path="/wyszukaj/" element={<Search />} />
        <Route path="/zaloguj/" element={ <Login />} />
        <Route path="profil" element={state.isAuthenticated ? <Profile /> : <Navigate to="/zaloguj" />}>
          <Route path="edytuj" element={<ProfileDetails />}/>
          <Route path="hotele" element={<MyHotels />} />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
      {state.loading ? <LoadingIcon /> : null}
    </>
  )

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
          onChange: changeTheme
        }}>
          <ReducerContext.Provider value={{state: state,
            dispatch: dispatch
          }}>
            <Layout
              header={header}
              menu={<Menu />}
              content={content}
              footer={<Footer />}
            />
          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
