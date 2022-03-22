import React from "react";

const ThemeContext = React.createContext({
    color: 'primary',
    onChange: () => {}
});

ThemeContext.displayName = 'ThemeContext';

export default ThemeContext;