import { AppearanceTypes, useToasts } from 'react-toast-notifications';

const useToast = () => {
  const { addToast } = useToasts();

  const newToast = (
    type: AppearanceTypes = 'success',
    message: string,
    heading?: string,
  ) => addToast({ message, heading }, { appearance: type })

  return {
    success: (message: string, heading?: string) => newToast('success', message, heading),
    error: (message: string, heading?: string) => newToast('error', message, heading)
  };
};

export default useToast;
