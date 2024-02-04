// loadingUtils.js

import React from 'react';
import { Spinner, Text, Box } from '@chakra-ui/react';

export function LoadingPopup() {
  return (
    <Box
      className="loading-popup"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Spinner size="xl" color="blue.500" />
      <Text mt="4">Loading data...</Text>
    </Box>
  );
}
