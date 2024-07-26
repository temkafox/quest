import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { data, dataTolik } from '../../data'
import { MainContainer } from './Main.styles'
import { Answers } from '../Answers';
import { Alert, Button } from '@mui/material';
import { CustomizedDialogs } from '../Dialog';
import { Image } from '@mui/icons-material';

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
  imageUrl?: string;
  isHiddenPhotoQuestion?: boolean;
  visibleImageUrl?: string;
  questionAnswers: {
    text: string;
    isTrue: boolean;
    id: number;
  }[];
}

interface MainProps {
  firstTeam?: string;
  secondTeam?: string;
  password: string;
}

export const Main: FC<MainProps> = ({ firstTeam, password }: MainProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

  const getData = useCallback(() => {
    if (password === '112') {
      return data;
    }
    return dataTolik;
  }, [password]);

  const amountOfQuestions = getData().length;

  useEffect(() => {
    const mappedData = getData().find((i) => i.questionNumber === questNumber);
    console.log(mappedData);
    if (mappedData)
      setQuestData(mappedData);
  }, [getData, questNumber]);

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

    setImageUrl('');

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

  const handleAnswer = useCallback((isTrue: boolean, visibleImageUrl?: string) => {
      setIsAnswersDisabled(true);
      setIsContinueDisabled(false);
      setQuestionIsDone(true);
      if (visibleImageUrl) {
        setImageUrl(visibleImageUrl);
      }
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
          <Typography variant="subtitle1">{`${password === '112' ? 'Лиза' : 'Толямбус'}`}, твой счет: {teamScore.firstTeam.score}</Typography>
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
            { questData.isHiddenPhotoQuestion ? (
              imageUrl ? (imageUrl && (<img src={imageUrl} style={{ maxWidth: '700px', maxHeight: '500px' }} />)) :
              (questData.imageUrl && (<img src={questData.imageUrl} style={{ maxWidth: '700px', maxHeight: '500px' }} />))
            ) : (questData.imageUrl && (<img src={questData.imageUrl} style={{ maxWidth: '700px', maxHeight: '500px' }} />))}
          </Item>
          <Item>
            <Answers questionIsDone={questionIsDone} data={questData.questionAnswers} handleAnswerProp={handleAnswer} visibleImageUrl={questData.visibleImageUrl} isDisabled={isAnswersDisabled} />
          </Item>
          <Item>
            <Button disabled={isContinueDisabled} onClick={handleContinue} color='success' variant="contained">Далее</Button>
          </Item>
        </>
      ) : null }
      
    </MainContainer>
  );
}