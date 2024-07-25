import React, { FC, useCallback, useState } from 'react';
// import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { Main } from './components/AdminPanel/Main';
import { TeamCreator } from './components/TeamCreator';

const App: FC = () => {

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default App;
