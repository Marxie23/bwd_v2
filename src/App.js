import React from 'react';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import WelcomeView from './views/WelcomeView';
import NotFound from './views/pages/NotFound';

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
              <Routes>
                <Route path='/*' element={<DashboardLayout/>}/>
                <Route path='/landing/*' element={<WelcomeView/>}/>

                <Route path="*" element={<NotFound/>}/>
              </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
