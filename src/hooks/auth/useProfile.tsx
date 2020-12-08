import { useSelector } from 'react-redux';

import { RootState } from '../../store';

const useProfile = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const { mode } = useSelector((state: RootState) => state.app);

  return { mode, profile };
};

export default useProfile;
