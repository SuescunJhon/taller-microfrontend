import { CircularProgress, Stack, Typography } from "@mui/material";

/**
 * Componente que muestra una pantalla de carga.
 * @returns React Component
 */
export default function LoadingIcon() {
    return (
        <Stack
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}>
            <CircularProgress />
            <Typography
                variant="subtitle">
                <b>Cargando...</b>
            </Typography>
        </Stack>
    );
}