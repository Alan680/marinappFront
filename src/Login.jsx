import { useState } from 'react';
import imagen from './assets/logo.png';
import { useNavigate, Link } from 'react-router-dom';
import { Box, FormControl, Heading, Input, FormLabel, Center, Image } from "@chakra-ui/react";
import * as React from 'react';

export function Login() {
  const [socio, setSocio] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/login', { //controlar si el puerto es el correcto
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: socio.email, 
          password: socio.password,
        }),
        credentials: 'include', // Envia cookies con la solicitud
      });

      const data = await response.json();

      if (response.ok) {
        // Si la autenticación es exitosa, guarda el token 
        sessionStorage.setItem('usuario', socio.email);
        navigate('/dashboard');
      } else {
        // Manejar errores de autenticación
        setError(data.errores || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión');
    }
  }

  return (
    <>
      <Box mt='30px'>
        <Center>
          <Image mt='3px' src={imagen} width='150px' height='150px' />
        </Center>
        <Center>
          <Box m='2%' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
            <Box textAlign='center'>
              <Heading>Iniciar Sesión</Heading>
            </Box>
            <Box p='20px'>
              <form id='formulario' onSubmit={handleSubmit}>
                <FormControl mt='3px'>
                  <FormLabel>Email</FormLabel>
                  <Input required type='text' id='email' onChange={(event) => setSocio({ ...socio, email: event.target.value })} />
                </FormControl>
                <FormControl mt='3px'>
                  <FormLabel>Contraseña</FormLabel>
                  <Input required type='password' id='pass' onChange={(event) => setSocio({ ...socio, password: event.target.value })} />
                </FormControl>
                {error && <Box color="red" mt="3px">{error}</Box>}
                <FormControl mt='3px'>
                  <Input type='submit' mt='3px' id='enviar' borderColor='teal' value='Iniciar Sesión' />
                </FormControl>
              </form>
              <Link to="/registro">
                <FormControl mt='3px'>
                  <Input type='submit' mt='3px' id='enviar' borderColor='teal' value='Registrarse' />
                </FormControl>
              </Link>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}
