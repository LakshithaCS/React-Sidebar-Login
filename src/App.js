import './App.css';
import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

//components
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import Login from './components/Login';

function App() {

  const theme = createTheme({
    typography: {
      fontFamily: ['"Open Sans"', "sans-serif"].join(","),
    },
    palette: {
      primary: {
        main: "#414143",
      },
      secondary: {
        main: "#d3d6db",
      },
      success: {
        main: "#008567",
      },
      error: {
        main: "#e02020",
      },
    },
  });

  const [show, setShow] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.auth.authData);

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />{/* The margin in all browsers is removed. The default Material Design background color is applied. */}

      {user &&
        location.pathname !== "/login" && (
          <Sidebar show={show} setShow={setShow} />
        )}

      <Routes>
        <Route path="/" element={<Layout />}>

          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />

        </Route>
      </Routes>

    </ThemeProvider>
  );
}

export default App;
