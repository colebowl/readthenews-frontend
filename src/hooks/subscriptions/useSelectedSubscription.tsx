import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { Subscription } from '../../shared/types';
import { setSelectedSubscription as setAction } from '../../store/app/actions';

const useSelectedSubscription = () => {
  const dispatch = useDispatch();
  const selectedSubscription = useSelector((s: RootState) => s.app.selectedSubscription);

  const setSelectedSubscription = (subscription?: Subscription) => {
    dispatch(setAction(subscription));
  }

  return { selectedSubscription, setSelectedSubscription }
}

export default useSelectedSubscription;
