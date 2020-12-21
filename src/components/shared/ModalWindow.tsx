import React from 'react';
import { Box, Layer, Heading, Button, Text } from 'grommet';

import Spinner from './Spinner';

type Props = {
  buttons?: JSX.Element[],
  heading?: string;
  loading?: boolean;
  message?: string;
  open?: boolean;
  onClose?: () => void;
  hideCancelButton?: boolean;
  cancelButtonText?: string;
}

const Modal: React.FC<Props> = (props) => {
  const {
    buttons,
    cancelButtonText,
    children,
    heading,
    hideCancelButton,
    loading,
    message,
    onClose,
    open
  } = props;

  const [modalOpen, setModalOpen] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (open !== undefined) {
      setModalOpen(open);
    }
  }, [open]);

  const handleModalClose = () => {
    setModalOpen(false);

    if (onClose) {
      onClose();
    }
  }

  return (
    <>{modalOpen && (
      <Layer position="center" onClickOutside={handleModalClose} onEsc={handleModalClose}>
        <Box pad="medium" gap="small" width="medium">
          {heading && (
            <Heading level={4} margin="none">
              {heading}
            </Heading>
          )}

          {loading ? <Spinner /> : (
            <>
              {message && <Text>{message}</Text>}
              {children}

              <Box
                as="footer"
                gap="small"
                direction="row"
                align="center"
                justify="end"
                pad={{ top: 'medium', bottom: 'small' }}
              >
                {!hideCancelButton && <Button label={cancelButtonText || 'Cancel'} onClick={handleModalClose} color="dark-3" />}
                {buttons && buttons.map((button, i: number) => (<span key={i}>{button}</span>))}
              </Box>
            </>
          )}
        </Box>
      </Layer>
    )}
    </>
  );
}

Modal.defaultProps = {

};

Modal.propTypes = {

};

export default Modal;
