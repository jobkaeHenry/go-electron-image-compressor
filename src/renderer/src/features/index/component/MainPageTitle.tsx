import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

interface MainPageTitleProps {
  title?: string;
  subTitle?: string;
}

const MainPageTitle = ({
  title = 'BANANA\nBREAD',
  subTitle = 'Stunning | WEBP Converter',
}: MainPageTitleProps): ReactElement => {
  return (
    <Stack direction={'column'} gap={1} textAlign={'center'}>
      <Typography
        whiteSpace={'pre-line'}
        lineHeight={0.9}
        fontSize={56}
        fontWeight={900}
      >
        {title}
      </Typography>
      <Box p={1} bgcolor={'primary.main'} width={'fit-content'} mx={'auto'}>
        <Typography
          fontSize={18}
          lineHeight={1.2}
          fontWeight={700}
          color={'white'}
        >
          {subTitle}
        </Typography>
      </Box>
    </Stack>
  );
};

export default MainPageTitle;
