import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { data } from '../../data'
import { MainContainer } from './Main.styles'
import { Answers } from '../Answers';
import { Alert, Button } from '@mui/material';
import { CustomizedDialogs } from '../Dialog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface QuestDataType {
  questionNumber: number;
  questionText: string;
  questionAnswers: {
    text: string;
    isTrue: boolean;
    id: number;
  }[];
}

interface MainProps {
  firstTeam?: string;
  secondTeam?: string;
}

export const Main: FC<MainProps> = ({ firstTeam = 'Лиза' }: MainProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);

  const [ questNumber, setQuestNumber ] = useState(1);
  const [ isAnswersDisabled, setIsAnswersDisabled ] = useState(false);
  const [ questionIsDone, setQuestionIsDone ] = useState(false);
  const [ teamScore, setTeamScore ] = useState({
    firstTeam: {
      id: 1,
      name: firstTeam,
      score: 0,
    },
  });
  const [ step, setStep ] = useState(1);
  const [ isContinueDisabled, setIsContinueDisabled ] = useState(true);
  const [ questData, setQuestData ] = useState<QuestDataType>();
  const amountOfQuestions = data.length;
  useEffect(() => {
    const mappedData = data.find((i) => i.questionNumber === questNumber);
    if (mappedData)
      setQuestData(mappedData);
  }, [questNumber]);
  const nextQuest = useCallback(() => {
    if (questNumber === amountOfQuestions) {
      return;
    }
    setQuestNumber(questNumber + 1)
  }, [amountOfQuestions, questNumber])

  const prevQuest = useCallback(() => {
    if (questNumber === 1) {
      return;
    }
    setQuestNumber(questNumber - 1)
  }, [questNumber])

  const handleContinue = useCallback(() => {
    if (questNumber === amountOfQuestions) {
      setIsEndDialogOpen(true);
      return;
    }
    nextQuest();
    setIsContinueDisabled(true);
    setStep(1);
    setIsAnswersDisabled(false);
    setQuestionIsDone(false);
    setIsDialogOpen(true);
    console.info(teamScore);
  }, [amountOfQuestions, nextQuest, questNumber, teamScore])

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, [])
  const handleEndCloseDialog = useCallback(() => {
    setIsEndDialogOpen(false);
  }, [])

  const handleAnswer = useCallback((isTrue: boolean) => {
      setIsAnswersDisabled(true);
      setIsContinueDisabled(false);
      setQuestionIsDone(true);
    if (isTrue) {
      setTeamScore({
        ...teamScore,
        firstTeam: {
          ...teamScore.firstTeam,
          score: teamScore.firstTeam.score + 1,
        }
      })
    }
  }, [teamScore])

  useEffect(() => {
    if (!questionIsDone) {
      setIsDialogOpen(true);
    }
  }, [step, questionIsDone]);

  return (
    <MainContainer spacing={2}>
      {/* <CustomizedDialogs isOpen={isDialogOpen} closeDialog={handleCloseDialog}>
        <Alert sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', }} severity="info">
          <Typography variant="subtitle1">Лиза, отвечай</Typography>
        </Alert>
      </CustomizedDialogs> */}
      <CustomizedDialogs isOpen={isEndDialogOpen} closeDialog={handleEndCloseDialog}>
        {/* <Alert sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px', fontSize: '30px' }} severity="success">{
          teamScore.firstTeam.score === teamScore.secondTeam.score ? 'Ничья!' : (
            teamScore.firstTeam.score > teamScore.secondTeam.score ? (
              `Побеждает команда ${firstTeam} со счётом ${teamScore.firstTeam.score}`
            ) : (
              `Побеждает команда ${secondTeam} со счётом ${teamScore.secondTeam.score}`
            )
          )
        }</Alert> */}

        <Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px'}}>
          <Typography variant="subtitle1">Лиза, твой счет: {teamScore.firstTeam.score}</Typography>
          {/* <Typography variant="subtitle1">{secondTeam}: {teamScore.secondTeam.score}</Typography> */}
        </Stack>
      </CustomizedDialogs>
      { questData ? (
        <>
          <Item>
            <Stack>
              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
              <Typography variant="h5" gutterBottom>Вопрос {questNumber}</Typography>
              </Stack>
            </Stack>
          </Item>
          <Item>
            <Typography variant="h5" gutterBottom>{questData && questData.questionText}</Typography>
          </Item>
          <Item>
            <Answers questionIsDone={questionIsDone} data={questData.questionAnswers} handleAnswerProp={handleAnswer} isDisabled={isAnswersDisabled} />
          </Item>
          <Item>
            <Button disabled={isContinueDisabled} onClick={handleContinue} color='success' variant="contained">Далее</Button>
          </Item>
        </>
      ) : null }
      
    </MainContainer>
  );
}