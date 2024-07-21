import {
  Collapse,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  Modal,
  Paper,
  Slider,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MainPage from '@renderer/features/index/MainPage';
import { ReactElement, useEffect, useState } from 'react';

const App = (): ReactElement => {
  const [isOpen, setOpen] = useState(false);
  const [isAutoConvert, setIsAutoConvert] = useState(true);
  const [isLossless, setIsLoseless] = useState(false);
  const [imageQuality, setImageQuality] = useState(70);

  const closeModal = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => setOpen(true), 300);
  }, []);

  return (
    <>
      <MainPage />
      <Modal
        open={isOpen}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disableAutoFocus
        onClose={(_, reason) => {
          if (reason === 'backdropClick') return;
          closeModal();
        }}
      >
        <Paper sx={{ p: 4, position: 'relative', width: '50%' }}>
          <IconButton
            onClick={closeModal}
            size="small"
            sx={{
              position: 'absolute',
              top: '-8px',
              right: '-36px',
              color: 'grey.300',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Stack direction={'column'} gap={1}>
            <Typography variant="subtitle2" fontWeight={'bold'}>
              설정
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  checked={isAutoConvert}
                  onChange={({ target }) => {
                    setIsAutoConvert(target.checked);
                  }}
                />
              }
              label="자동 변환"
            />
            <Collapse in={!isAutoConvert}>
              <Divider sx={{ mb: 2 }} />
              <Collapse in={!isLossless}>
                <Stack>
                  <Typography>이미지 퀄리티</Typography>
                  <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    disabled={isLossless}
                    marks
                    step={10}
                    min={10}
                    max={100}
                    value={imageQuality}
                    onChange={(_, value) => {
                      if (Array.isArray(value)) return;
                      setImageQuality(value);
                    }}
                  />
                </Stack>
              </Collapse>
              <Collapse in={imageQuality === 100}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isLossless}
                      onChange={({ target }) => setIsLoseless(target.checked)}
                    />
                  }
                  label={
                    <Tooltip
                      sx={{ whiteSpace: 'pre-line' }}
                      title={'무손실압축의 경우 30% 정도 더 무겁습니다'}
                    >
                      <span>무손실압축</span>
                    </Tooltip>
                  }
                />
              </Collapse>
              <></>
            </Collapse>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default App;
