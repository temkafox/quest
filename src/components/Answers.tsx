import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FC, MouseEventHandler, useCallback } from 'react';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

type AnswersProps = {
  data: {
    text: string,
    isTrue: boolean,
    id: number,
  }[],
  handleAnswerProp: (isTrue: boolean, visibleImageUrl?: string) => void;
  isDisabled: boolean;
  questionIsDone: boolean;
  visibleImageUrl?: string;
}

export const Answers: FC<AnswersProps> = ({ data, handleAnswerProp, isDisabled, questionIsDone, visibleImageUrl }: AnswersProps) => {
  const handleAnswer = useCallback((isTrue: boolean) => () => {
    if(isDisabled) {
      return;
    }
      handleAnswerProp(isTrue, visibleImageUrl);
    }, [handleAnswerProp, isDisabled, visibleImageUrl])
  
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', justifyContent: 'center' }}>
      <Stack spacing={2} direction={'column'}>
        {(
          data.map((item) => {
            return <Button
                      key={item.id}
                      disableRipple={isDisabled}
                      onClick={handleAnswer(item.isTrue)}
                      color={item.isTrue && questionIsDone ? 'success' : 'primary'}
                      variant={item.isTrue && questionIsDone ? 'contained' : 'text'}
                    >
                        {item.text}
                    </Button>
          })
        )}
      </Stack>
    </Box>
  )
}