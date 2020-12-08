import React from 'react'
import { Route, RouteComponentProps } from 'react-router-dom';

import PageWrapper from '../layout/PageWrapper';

interface Props {
  component: React.FC<any>;
  [key: string]: any;
}

const AppRoute = ({ component: Component, ...rest }: Props) => {

  const renderRoute = (props: RouteComponentProps<any>) => {
    return <PageWrapper><Component {...props} /></PageWrapper>
  }

  return (
    <Route {...rest} render={renderRoute} />
  )
};

export default AppRoute;
