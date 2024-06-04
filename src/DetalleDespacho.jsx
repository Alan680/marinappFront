import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

export function DetalleDespacho() {
    const { id } = useParams();
    const [despacho, setDespacho] = useState(null);

    useEffect(() => {
        const mockDespachos = [
            { id: 1, nombreEmbarcacion: "Marina A", matriculaEmbarcacion: "ABC123", fechaSalida: "2024-05-20", horaSalida: "08:00", pasajeros: 5, dniResponsable: "12345678A", telefono: "123456789", fechaLlegada: "2024-05-20", horaLlegada: "12:00", observaciones: "Sin observaciones" },
            { id: 2, nombreEmbarcacion: "Marina B", matriculaEmbarcacion: "DEF456", fechaSalida: "2024-05-21", horaSalida: "09:00", pasajeros: 8, dniResponsable: "87654321B", telefono: "987654321", fechaLlegada: "2024-05-21", horaLlegada: "13:00", observaciones: "Necesita mantenimiento" },
        ];

        const selectedDespacho = mockDespachos.find(despacho => despacho.id === parseInt(id));
        setDespacho(selectedDespacho);
    }, [id]);

    if (!despacho) {
        return <Text>Cargando...</Text>;
    }

    return (
        <Box m='50px'>
            <Heading mb='4'>Detalle del Despacho</Heading>
            <Text><strong>Nombre de la embarcación:</strong> {despacho.nombreEmbarcacion}</Text>
            <Text><strong>Matrícula de la embarcación:</strong> {despacho.matriculaEmbarcacion}</Text>
            <Text><strong>Fecha de salida:</strong> {despacho.fechaSalida}</Text>
            <Text><strong>Hora de salida:</strong> {despacho.horaSalida}</Text>
            <Text><strong>Pasajeros a bordo:</strong> {despacho.pasajeros}</Text>
            <Text><strong>Número de DNI del responsable:</strong> {despacho.dniResponsable}</Text>
            <Text><strong>Número de teléfono:</strong> {despacho.telefono}</Text>
            <Text><strong>Fecha de llegada:</strong> {despacho.fechaLlegada}</Text>
            <Text><strong>Hora de llegada:</strong> {despacho.horaLlegada}</Text>
            <Text><strong>Observaciones:</strong> {despacho.observaciones}</Text>
        </Box>
    );
}