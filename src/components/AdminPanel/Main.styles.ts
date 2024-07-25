import styled from "@emotion/styled";
import { Stack } from "@mui/material";

export const MainContainer = styled(Stack)({
  boxSizing: 'border-box',
  backgroundColor: '#F7F6F1',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
});
