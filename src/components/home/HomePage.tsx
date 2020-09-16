import React from 'react';
import { Link } from 'react-router-dom';

interface Props { }

const HomePage: React.FC<Props> = (props) => {
  return (
    <>
      <h1>This is the home page!</h1>
      <Link to="/register">Register</Link>
    </>
  );
};
export default HomePage;
