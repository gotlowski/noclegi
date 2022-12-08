import { render, screen } from '@testing-library/react';
import { HashRouter as Router } from 'react-router-dom';
import Menu from './Menu';
import AuthContext from '../../context/authContext'

describe('Menu component', () => {
test('renders Zaloguj if user is null', () => {
    render(<Router><Menu /></Router>);
    const linkElement = screen.getByText(/zaloguj/i);
    expect(linkElement).toBeInTheDocument();
});
test('renders Wyloguj if user is null', () => {
    render(
        <AuthContext.Provider
            value={
                {
                    user: { email: 'email@test.pl' },
                    login: () => { },
                    logout: () => { }
                }
            }><Router><Menu /></Router>
        </AuthContext.Provider >);
    const linkElement = screen.getByText(/wyloguj/i);
    expect(linkElement).toBeInTheDocument();
});
});