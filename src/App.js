import React, { Component } from 'react';
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


class App extends Component { 
  hotels = [
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
  state = {
    hotels: [],
    loading: true,
    isAuthenticated: false
  };

  searchHandler(term) {
    const hotels = [...this.hotels]
      .filter(x => x.name
          .toLowerCase()
          .includes(term.toLowerCase()));
    this.setState({ hotels });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ 
          hotels: this.hotels, 
          loading: false,
          theme: "secondary"
      });
    }, 1000);
  }

  changeTheme = () =>  {
    const newTheme = this.state.theme === 'primary' ? 'secondary' :  'primary'
    this.setState(
      {
        theme: newTheme
      }
    )
  }

  render() {
    const header = (
      <Header>
              <Searchbar onSearch={term => this.searchHandler(term)}/>
              <ThemeButton changeTheme={this.changeTheme} />
            </Header>
    )
    const content = (
      this.state.loading 
      ? <LoadingIcon theme={this.contextType} />
      : <Hotels hotels={this.state.hotels} />
    )
    return (
      <AuthContext.Provider 
      value={
        { isAuthenticated: this.state.isAuthenticated,
          login: () => {this.setState({isAuthenticated: true      })} ,
          logout: () => {this.setState({isAuthenticated: false      })} 
        }
            }>
      <ThemeContext.Provider value = {{
        color: this.state.theme,
        onChange: this.changeTheme}}>
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
}

export default App;
