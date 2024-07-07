import { Box, BoxProps, Stack } from '@mui/material';
import { InputHTMLAttributes, useState, useEffect, ReactElement } from 'react';
import useRenderAsDataUrl from '@renderer/hooks/useRenderAsDataUrl';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';

interface ImageInputInterface extends BoxProps {
  onFileChange: (file?: File) => void;
  initialImage?: string;
}

export const ImageInput = ({
  onFileChange,
  initialImage,
  width = 100,
  height = 100,
}: ImageInputInterface): ReactElement => {
  const [file, setFile] = useState<File>();

  useEffect(() => {
    onFileChange(file);
  }, [file]);

  const fileUrl = useRenderAsDataUrl(file) ?? initialImage;
  return (
    <Box component={'label'} width={width} height={height}>
      {fileUrl ? (
        <Box
          sx={{ backgroundImage: `url(${fileUrl})`, backgroundSize: 'contain' }}
          width={width}
          height={height}
        />
      ) : (
        <Stack
          width={width}
          height={height}
          sx={{
            bgcolor: 'grey.50',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'grey.400',
            border: '1px solid',
            borderColor: 'grey.400',
            borderRadius: '8px',
          }}
        >
          <PhotoSizeSelectActualOutlinedIcon />
        </Stack>
      )}
      <SingleImageInput
        onChange={(file) => {
          setFile(file);
        }}
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
      accept="image/*"
      onChange={(e) => {
        if (e.target.files) {
          onChange(e.target.files[0]);
        }
      }}
      {...others}
    />
  );
};
