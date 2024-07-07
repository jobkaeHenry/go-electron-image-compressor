import { Button, Container, Stack, Typography } from '@mui/material';
import Spacer from '@renderer/components/Spacer';
import useTitle from '@renderer/hooks/useTitle';
import { ReactElement } from 'react';

const App = (): ReactElement => {
  useTitle('Stunning | Webp 컨버터');
  return (
    <Container>
      <Spacer height="36px" />
      <Stack direction="column" gap={4}>
        <Typography variant="h1" fontWeight="bold">
          WEBP Converter
        </Typography>
        <Typography variant="subtitle2">test</Typography>
        <Typography>test</Typography>
        <Button>버튼</Button>
      </Stack>
    </Container>
  );
};

export default App;
