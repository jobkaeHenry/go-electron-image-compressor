import {
  Button,
  ButtonProps,
  CircularProgress,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { ImageInput } from '@renderer/components/FileInput';
import useTitle from '@renderer/hooks/useTitle';
import { ReactElement, useState } from 'react';
import FixedBottomCTA from '@renderer/components/FixBottomCTA';
import { UI_SIZE } from '@renderer/const/style/UI_SIZE';
import MainPageTitle from '@renderer/features/index/component/MainPageTitle';
import MainPageBottomLogo from '@renderer/features/index/component/MainPageBottomLogo';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import theme from '@renderer/const/style/DefaultTheme';

const MainPage = (): ReactElement => {
  useTitle('Stunning | Webp 컨버터');
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [dataUrl, setDataUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const [status, setStatus] = useState<
    'standby' | 'pending' | 'reject' | 'resolve'
  >('standby');

  const downloadHandler = (url: string): void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName
      ? `${fileName.split('.')[0]}.webp`
      : 'banana_bread.webp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const bufferTodataUrl = (buff: Buffer): string => {
    const base64String = buff.toString('base64');
    const dataUrl = `data:image/webp;base64,${base64String}`;
    return dataUrl;
  };

  const convertFileHandler = async (file?: File): Promise<void> => {
    if (!file) {
      return;
    }
    setStatus('pending');
    const { path, type } = file;

    try {
      let imageBuffer: Buffer;

      if (type.includes('mp4')) {
        imageBuffer = await window.api.convertVideo(path);
      } else imageBuffer = await window.api.convertImage(path);

      // dataUrl (화면 표출용)
      const dataUrl = bufferTodataUrl(imageBuffer);

      setDataUrl(dataUrl);
      // resolve
      setStatus('resolve');
    } catch {
      setStatus('reject');
    }
  };

  const ButtonProps: ButtonProps = {
    disabled: !dataUrl || status === 'pending',
    startIcon:
      status === 'pending' ? (
        <CircularProgress size={20} />
      ) : (
        <FileDownloadIcon />
      ),
    onClick: () => downloadHandler(dataUrl),
    children: ButtonNameMap[status],
  };

  return (
    <Container
      sx={{
        minHeight: `calc(100vh - ${UI_SIZE.FIXED_BOTTOM_CTA_HEIGHT})`,
        mb: UI_SIZE.FIXED_BOTTOM_CTA_HEIGHT,
      }}
    >
      <Stack direction="column" gap={{ xs: 4, md: 8 }} py={4}>
        <MainPageTitle />
        <Stack direction={'column'} gap={1} width={'100%'}>
          <Typography variant="label" fontWeight={500}>
            미리보기
          </Typography>
          <ImageInput
            width={'100%'}
            dataUrl={dataUrl}
            height={{ xs: '300px', md: '400px' }}
            inputProps={{ disabled: status === 'pending' }}
            onFileChange={(file) => {
              if (!file) return;
              setFileName(file.name);
              convertFileHandler(file);
            }}
          />
        </Stack>
      </Stack>

      <MainPageBottomLogo />
      {isSmallScreen ? (
        <FixedBottomCTA {...ButtonProps} />
      ) : (
        <Button {...ButtonProps} fullWidth size="large" />
      )}
    </Container>
  );
};

export default MainPage;

const ButtonNameMap = {
  standby: '파일을 선택해주세요',
  pending: '변환중',
  reject: '다운로드',
  resolve: '다운로드',
};
