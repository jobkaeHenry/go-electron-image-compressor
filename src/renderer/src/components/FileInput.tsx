import { Box, BoxProps, Stack, Typography } from '@mui/material';
import { InputHTMLAttributes, useState, useEffect, ReactElement } from 'react';
import useRenderAsDataUrl from '@renderer/hooks/useRenderAsDataUrl';
import ImagePreviewer from '@renderer/components/ImagePreviewer';
import UploadFileIcon from '@mui/icons-material/UploadFile';
interface ImageInputInterface extends BoxProps {
  onFileChange: (file?: File) => void;
  dataUrl?: string | ArrayBuffer | null;
  inputProps?: Omit<SingleImageInputInterface, 'onChange'>;
}

export const ImageInput = ({
  onFileChange,
  dataUrl,
  width = 100,
  height = 100,
  inputProps,
}: ImageInputInterface): ReactElement => {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    onFileChange(file);
  }, [file]);

  const fileUrl = dataUrl ?? useRenderAsDataUrl(file);

  return (
    <Box
      component={'label'}
      width={width}
      height={height}
      sx={{
        transitionDuration: '200ms',
        cursor: inputProps?.disabled ? 'default' : 'pointer',
        opacity: inputProps?.disabled ? '0.6' : '1',
      }}
    >
      {fileUrl ? (
        <ImagePreviewer sx={{ width, height }} fileUrl={fileUrl} />
      ) : (
        <Stack
          width={width}
          height={height}
          gap={1}
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey.600',
            border: '1px solid',
            borderColor: 'primary.main',
          }}
        >
          <UploadFileIcon />
          <Typography variant="label">
            JPG / PNG / GIF / MP4 파일을 업로드 해주세요
          </Typography>
        </Stack>
      )}
      <SingleImageInput
        onChange={(file) => {
          setFile(file);
        }}
        {...inputProps}
      />
    </Box>
  );
};

interface SingleImageInputInterface
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'type' | 'capture' | 'style' | 'name'
  > {
  onChange: (file: File) => void;
}

export const SingleImageInput = ({
  onChange,
  ...others
}: SingleImageInputInterface): ReactElement => {
  return (
    <input
      name="image"
      style={{ display: 'none' }}
      type="file"
      accept="*"
      onChange={(e) => {
        if (e.target.files) {
          onChange(e.target.files[0]);
        }
      }}
      {...others}
    />
  );
};
