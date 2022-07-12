import  React  from  "react";
// Context has been created
const  ThemeContext  =  React.createContext({toggle: false, toggleFunction: () => {}});
// Provider
const  ThemeProvider  =  ({ children })  =>  {
    const  [toggle, setToggle]  =  React.useState(true);
    const toggleFunction =  ()  =>  {
    setToggle(!toggle);
};
return  (
    <ThemeContext.Provider value={{ toggle, toggleFunction }}>
        {children}
    </ThemeContext.Provider>
    );
};
export  {  ThemeContext,  ThemeProvider  };