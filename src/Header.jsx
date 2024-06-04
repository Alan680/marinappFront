import { Link, useNavigate } from "react-router-dom";
import imagen from './assets/logo.png';
import * as React from "react";
import { useState, useEffect } from "react";
import { Flex, HStack, Box, Image } from "@chakra-ui/react";

export function Header() {
    const navigate = useNavigate();
    const [alturaRio, setAlturaRio] = useState(localStorage.getItem('alturaRio') || 0);

    useEffect(() => {
        let today = new Date();
        let year = today.getFullYear();
        let month = String(today.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes ya que en JavaScript los meses van de 0 a 11
        let day = String(today.getDate()).padStart(2, '0');
        let formattedDate = `${year}-${month}-${day}`;

        const url = `https://alerta.ina.gob.ar/pub/datos/datos&timeStart=2023-09-25&timeEnd=${formattedDate}&seriesId=81&format=json`;
        fetch(url)
            .then((response) => response.json())
            .then((info) => {
                const json = info.data;
                let ultimoElemento = json[json.length - 1];
                let valorAlturaRio = parseFloat(ultimoElemento.valor).toFixed(2) + ' mts';


                // Actualizar el estado y localStorage
                setAlturaRio(valorAlturaRio);
                localStorage.setItem('alturaRio', valorAlturaRio);
            });
    }, []);

    function cerrarSesion() {
        sessionStorage.removeItem("usuario");
        navigate("/");
    }

    return (
        <>
            <Flex w='100%' h='70px' p='6px' align='center' justify='space-between' bgColor='#2B6CB0' color='white'>
                <HStack as='nav' spacing='10px'>
                    <Link to={'/dashboard'}>
                        <Image src={imagen} h='50px' ml='6px' />
                    </Link>
                    <Link to={'/despacho'}><Box _hover={{ color: 'gray.300' }}>Nuevo Despacho</Box></Link>
                    <Box id="alturaRioNavBar">Altura del Río: {alturaRio}</Box>
                </HStack>

                <HStack as='nav' spacing='10px'>
                    <Box mr='20px' cursor='pointer' _hover={{ color: 'gray.300' }} onClick={() => cerrarSesion()}>Cerrar sesion</Box>
                </HStack>
            </Flex>
        </>
    );
}
