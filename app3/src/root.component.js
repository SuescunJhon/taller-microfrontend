import { Stack, Divider, Stepper, Box, Step, StepLabel, Typography, FormLabel, Radio, FormControlLabel, RadioGroup, FormControl } from "@mui/material";
import { Suspense, useState } from "react";
import LoadingIcon from "./components/LoadingIcon";
import PagoForm from "./components/PagoForm";

/**
 * Página para ver el carrito del usuario.
 * @returns React Component
 */
export default function Root(props) {

    const auth = { id: 12, nombre: "Jose" }
    const steps = [
        "Armar tu pedido",
        "Confirmar el pedido",
        "Pagar"
    ]
    const [medio, setMedio] = useState(0);
    //const navigate = useNavigate();

    function handleChange(e) {
        setMedio(e.target.value);
    }

    if (auth == undefined) {
        // navigate("/login", { replace: true });
    };

    return (
        <Suspense
            fallback={<LoadingIcon />}>
            <Stack
                direction="column"
                spacing={6}
                alignItems={"center"}
                justifyContent={"center"}>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={2} alternativeLabel>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>
                                    <Typography
                                        variant="h6">
                                        {step}
                                    </Typography>
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Stack
                    direction={"row"}
                    spacing={3}
                    divider={<Divider orientation="vertical" flexItem />}
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <FormControl>
                        <FormLabel>
                            <Typography
                                variant="h6">
                                <b>Seleccionar medio de pago.</b>
                            </Typography>
                        </FormLabel>
                        <RadioGroup
                            value={medio}
                            onChange={(e) => handleChange(e)}>
                            <FormControlLabel value={0} control={<Radio />} label="Tarjeta" />
                            <FormControlLabel value={1} control={<Radio />} label="Cheque" />
                            <FormControlLabel value={2} control={<Radio />} label="Transferencia bancaria" />
                        </RadioGroup>
                    </FormControl>
                    <PagoForm
                        tipo={medio} />
                </Stack>
            </Stack>
        </Suspense>
    );
}