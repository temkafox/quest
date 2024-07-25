import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FC, useCallback, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type TeamCreatorProps = {
  nextStep: (team1: string, team2: string) => void;
}

export const TeamCreator: FC<TeamCreatorProps> = ({ nextStep }: TeamCreatorProps) => {
  const [firstTeam, setFirstTeam] = useState('');
  const [secondTeam, setSecondTeam] = useState('');

  const save = useCallback(
    () => {
      nextStep(firstTeam, secondTeam);
    },
    [firstTeam, nextStep, secondTeam],
  );

  const isDisabled = !firstTeam || !secondTeam;
  

  return (
    <Container maxWidth="sm">
      <Item sx={{ marginBottom: '30px', marginTop: '50px' }}>
        <Typography variant="h5" gutterBottom>Введите названия команд</Typography>
      </Item>
      <Item>
        <Stack direction="column" spacing={2}>
          <TextField
            value={firstTeam}
            id="outlined-basic"
            label="Команда 1"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFirstTeam(event.target.value);
            }}
          />
          <TextField
            value={secondTeam}
            id="outlined-basic"
            label="Команда 2"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setSecondTeam(event.target.value);
            }}
          />
          <Button disabled={isDisabled} onClick={save} color='success' variant="contained">Сохранить</Button>
        </Stack>
      </Item>
    </Container>
  )
}