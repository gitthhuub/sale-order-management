// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Box, Button, Input, FormLabel } from '@chakra-ui/react';
// import useAuth from '../hooks/useAuth';

// const Login = () => {
//   const { register, handleSubmit } = useForm();
//   const { login } = useAuth();

//   const onSubmit = ({ username, password }) => {
//     login(username, password);
//   };

//   return (
//     <Box w="300px" mx="auto" mt="100px">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <FormLabel>Username</FormLabel>
//         <Input {...register('username')} required />
//         <FormLabel>Password</FormLabel>
//         <Input {...register('password')} type="password" required />
//         <Button type="submit" mt="4" colorScheme="blue">Login</Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

