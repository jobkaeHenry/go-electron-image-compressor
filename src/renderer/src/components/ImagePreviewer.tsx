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
          border: '1px solid',
          borderColor: 'primary.main',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          ...sx,
        }}
        ref={ref}
      />
    );
  }
);

ImagePreviewer.displayName = 'ImagePreviewer';
export default ImagePreviewer;
