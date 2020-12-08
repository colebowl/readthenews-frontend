import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Email } from '../../shared/types';
import { setSelectedEmail as setAction } from '../../store/app/actions';

const useSelectedEmail = () => {
  const dispatch = useDispatch();
  const selectedEmail = useSelector((s: RootState) => s.app.selectedEmail);

  const setSelectedEmail = (email?: Email) => {
    dispatch(setAction(email));
  }

  return { selectedEmail, setSelectedEmail }
}

export default useSelectedEmail;
