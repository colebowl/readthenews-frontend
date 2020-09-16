import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect, useLocation, RouteComponentProps } from 'react-router-dom';
import AppWrapper from '../layout/AppWrapper';
import useQuery from '../../hooks/useQuery';
import { RootState } from '../../store';

interface Props {
  component: React.FC<any>;
  [key: string]: any;
}

const AuthenticatedRoute = ({ component: Component, ...rest }: Props) => {
  const { isAuthenticated } = useSelector((st: RootState) => st.auth);
  const location = useLocation();
  const { returnTo } = useQuery();

  const renderRoute = (props: RouteComponentProps<any>) => {
    if (!isAuthenticated) {
      return <Redirect to={`/login?returnTo=${location.pathname}${location.search}`} />
    };

    if (returnTo) {
      return <Redirect to={returnTo} />
    }

    return location.pathname.startsWith('/welcome')
      ? <Component {...props} />
      : <AppWrapper><Component {...props} /></AppWrapper>
  }

  return <Route {...rest} render={renderRoute} />
}

export default AuthenticatedRoute;
