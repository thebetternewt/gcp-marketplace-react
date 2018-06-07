import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '../UI';

const NotFound = () => {
  return (
    <Box>
      <h3>No Profile Found</h3>
      <Link to="/profiles">
        <Button>Back to Profiles</Button>
      </Link>
    </Box>
  );
};

export default NotFound;
