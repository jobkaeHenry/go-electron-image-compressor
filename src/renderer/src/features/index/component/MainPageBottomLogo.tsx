import Box from '@mui/material/Box';
import { ReactElement } from 'react';
import StunningLogo from '@renderer/assets/stunningLogo.svg';

const MainPageBottomLogo = (): ReactElement => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${StunningLogo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        opacity: 0.03,
      }}
      width={'432px'}
      height={'300px'}
      position={'fixed'}
      right={-16}
      bottom={16}
      zIndex={-1}
    />
  );
};

export default MainPageBottomLogo;
