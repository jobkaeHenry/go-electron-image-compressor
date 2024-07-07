import Box, { BoxProps } from '@mui/material/Box';
import { forwardRef, Ref } from 'react';

interface PreviewImageByURLProps extends BoxProps {
  fileUrl: string | ArrayBuffer;
}

const ImagePreviewer = forwardRef(
  ({ fileUrl, sx }: PreviewImageByURLProps, ref: Ref<'div'>) => {
    return (
      <Box
        sx={{
          backgroundImage: `url(${fileUrl})`,
          width: '100%',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'gray.secondary',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          aspectRatio: 2.36,
          ...sx,
        }}
        ref={ref}
      />
    );
  }
);

ImagePreviewer.displayName = 'ImagePreviewer';
export default ImagePreviewer;
