import { Grid } from '@mui/material';
import React from 'react';
import CategoryCard from '../components/CategoryCard';

const About = () => {



  return <Grid container display="flex" flexDirection="row" justifyContent="center">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
  </Grid>;
};

export default About;
