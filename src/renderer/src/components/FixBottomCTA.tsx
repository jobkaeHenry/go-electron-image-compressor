import { Button, ButtonProps, Paper } from '@mui/material';
import { UI_SIZE } from '@renderer/const/style/UI_SIZE';
import { ReactElement } from 'react';

const FixedBottomCTA = ({ ...props }: ButtonProps): ReactElement => {
  return (
    <>
      <Button
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: UI_SIZE.FIXED_BOTTOM_CTA_HEIGHT,
          borderRadius: 0,
          fontSize: '1rem',
          zIndex: 2,
        }}
        {...props}
      />
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: UI_SIZE.FIXED_BOTTOM_CTA_HEIGHT,
          zIndex: 1,
        }}
      ></Paper>
    </>
  );
};

export default FixedBottomCTA;
