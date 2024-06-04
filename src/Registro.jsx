import * as React from 'react';
import { useState } from 'react';
import { Center, Box, Heading, FormControl, FormLabel, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';

export function Registro() {
    const [socio, setSocio] = useState({ email: '', password: '', nombre: '', apellido: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, nombre, apellido } = socio;

        if (email === '' || password === '' || nombre === '' || apellido === '') {
            setError('Por favor, complete todos los campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/users/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(socio),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Usuario registrado exitosamente');
                setError('');
                // Limpia los campos después de enviar el formulario
                setSocio({ email: '', password: '', nombre: '', apellido: '' });
            } else {
                setError(data.errors ? data.errors[0].msg : 'Error en el registro');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setError('Error de conexión');
            setSuccess('');
        }
    };

    return (
        <>
            <Center>
                <Box m='40px' boxShadow='xl' borderRadius='md' width='40%' id='caja'>
                    <Box textAlign='center'>
                        <Heading>Nuevo Socio</Heading>
                    </Box>
                    <Box p='20px'>
                        {error && (
                            <Alert status="error" mb="5">
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert status="success" mb="5">
                                <AlertIcon />
                                {success}
                            </Alert>
                        )}
                        <form id='formulario' onSubmit={handleSubmit}>
                            <FormControl mt='3px'>
                                <FormLabel>Nombre</FormLabel>
                                <Input
                                    type="text"
                                    name="nombre"
                                    value={socio.nombre}
                                    onChange={(e) => setSocio({ ...socio, nombre: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Apellido</FormLabel>
                                <Input
                                    type="text"
                                    name="apellido"
                                    value={socio.apellido}
                                    onChange={(e) => setSocio({ ...socio, apellido: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={socio.email}
                                    onChange={(e) => setSocio({ ...socio, email: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <FormControl mt='3px'>
                                <FormLabel>Contraseña</FormLabel>
                                <Input
                                    type='password'
                                    name='password'
                                    value={socio.password}
                                    onChange={(e) => setSocio({ ...socio, password: e.target.value })}
                                    required
                                />
                            </FormControl>
                            <Button type="submit" mt='20px' colorScheme='teal' width='full'>
                                Registrarse
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Center>
        </>
    );
}
