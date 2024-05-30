import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      isChecked={colorMode === 'dark'}
      onChange={toggleColorMode}
      position="absolute"
      top="1rem"
      right="1rem"
    />
  );
};

export default ThemeToggle;
