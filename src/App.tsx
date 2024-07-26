import React, { FC, useCallback, useState } from 'react';
// import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { Main } from './components/AdminPanel/Main';
import { TeamCreator } from './components/TeamCreator';
import { TextField } from '@mui/material';

const App: FC = () => {
  const [password, setPassword] = useState<string>('');

  const getTeamName = useCallback(() => {
    if (password === '112') {
      return 'Лиза'
    } 
    return 'Толямбус'
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        {!(password === '009' || password === '112') && (
          <TextField
            value={password}
            id="outlined-basic"
            label="Введите пароль"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
          />
        )}
        {password && (password === '112' || password === '009') && (
          <Main password={password} firstTeam={getTeamName()} />
        )}
      </ThemeProvider>
    </div>
  );
};

export default App;
