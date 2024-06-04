import React, { useState, useEffect } from "react";
import { Box, TableContainer, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";

export function ListaDespachos() {
    const [despachos, setDespachos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('token');
    const URL = 'https://marinappback-production.up.railway.app';

    useEffect(() => {
        const fetchDespachos = async () => {
            try {
                const response = await fetch(`${URL}/despachos`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setDespachos(data);
                } else {
                    setError('Error al cargar los despachos');
                }
            } catch (error) {
                console.error('Error de conexión:', error);
                setError('Error de conexión al cargar los despachos');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDespachos();
    }, [URL]);
  

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Box m='50px'>
            {despachos.length === 0 ? (
                <div>No hay despachos disponibles.</div>
            ) : (
                <TableContainer>
                    <Table size='md' variant='striped' colorScheme='gray'>
                        <Thead>
                            <Tr>
                                <Th>Nombre de la embarcación</Th>
                                <Th>Matrícula de la embarcación</Th>
                                <Th>Fecha de salida</Th>
                                <Th>Hora de salida</Th>
                                <Th>Fecha de llegada</Th>
                                <Th>Hora de llegada</Th>
                                <Th>Observaciones</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {despachos.map((despacho, index) => (
                                <Tr key={index}>
                                    <Td>{despacho.nombreEmbarcacion}</Td>
                                    <Td>{despacho.matriculaEmbarcacion}</Td>
                                    <Td>{despacho.fechaSalida}</Td>
                                    <Td>{despacho.horaSalida}</Td>
                                    <Td>{despacho.fechaLlegada}</Td>
                                    <Td>{despacho.horaLlegada}</Td>
                                    <Td>{despacho.observaciones}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}
