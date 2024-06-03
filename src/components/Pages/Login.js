

import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, FormLabel } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const onSubmit = ({ username, password }) => {
    login(username, password);
  };

  return (
    <Box w="300px" mx="auto" mt="100px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Username</FormLabel>
        <Input {...register('username')} required />
        <FormLabel>Password</FormLabel>
        <Input {...register('password')} type="password" required />
        <Button type="submit" mt="4" colorScheme="blue">Login</Button>
      </form>
    </Box>
  );
};

export default Login;

