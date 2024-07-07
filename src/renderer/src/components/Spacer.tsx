import { ReactElement } from 'react';

interface SpacerProps {
  width?: string;
  height?: string;
}

const Spacer = ({
  width = '0',
  height = '16px',
}: SpacerProps): ReactElement => {
  return <div style={{ width, height }}></div>;
};

export default Spacer;
