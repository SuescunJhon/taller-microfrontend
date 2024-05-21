import dayjs from 'dayjs';
import { Card, Select, TextField, MenuItem, Button, Stack, CardContent, InputLabel, FormControl, Typography, Divider } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { valTarj, valNom, valNum, valBanco, valCheque } from "../utils/Validadores";
import { useEffect, useState } from 'react';
import banco from "../assets/banco.svg"
import cheque from "../assets/cheque.svg"
import mastercard from "../assets/icono_mastercard.svg"
import visa from "../assets/icono-visa.svg"
import maestro from "../assets/icono-maestro.svg"
import amex from "../assets/icono-amex.svg"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

/**
 * Formulario de pago, incluye los métodos de pago: cheque, tarjeta y transferencia.
 * @param {Int} tipo - Tarjeta: 0, Cheque: 1 y transferencia: 2.
 * @returns React Component
 */
export default function PagoForm({ tipo }) {

    /*const auth = useAuth();
    const carrito = useCarrito();
    const navigate = useNavigate();*/

    const hoy = dayjs();
    const [errNombre, setErrNombre] = useState({ val: false, msg: "" });
    const [errNum, setErrNum] = useState({ val: false, msg: "" });
    const [errDig, setErrDig] = useState({ val: false, msg: "" });
    const [errBan, setErrBan] = useState({ val: false, msg: "" });
    const [errSerie, setErrSerie] = useState({ val: false, msg: "" });
    const [errCod, setErrCod] = useState({ val: false, msg: "" });
    const [errPag, setErrPag] = useState({ val: false, msg: "" });
    const [errIdCuent, setErrIdCuent] = useState({ val: false, msg: "" });
    const [errId, setErrId] = useState({ val: false, msg: "" });
    const [icono, setIcono] = useState(mastercard);
    const [datos, setDatos] = useState({
        tarj: "", nombre: "", id: "", cvv: "", banco: "", pagador: "",
        cod: "", serie: "", idCuenta: ""
    });
    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");

    useEffect(() => {
        let subtitulo;
        let titulo;

        if (tipo == 0) {
            cambiarIcono(1);
            titulo = "Formulario de pago con tarjeta";
            subtitulo = "Datos de la tarjeta";
        }
        else if (tipo == 1) {
            setIcono(cheque);
            titulo = "Formulario de pago con cheque";
            subtitulo = "Datos del cheque";
        }
        else {
            setIcono(banco);
            titulo = "Transferencia bancaria";
            subtitulo = "Datos de la cuenta";
        }

        setDatos({
            tarj: "", nombre: "", id: "", cvv: "", banco: "", pagador: "",
            cod: "", serie: "", idCuenta: ""
        });
        quitarError();
        setTitulo(titulo);
        setSubtitulo(subtitulo);
    }, [tipo]);

    async function comprar() {
        await fetch(
            import.meta.env.gateway,
            {
                method: "POST",
                body: JSON.stringify({
                    target: "/pagos",
                    method: "POST",
                    //usuario: auth,
                    //prods: carrito-productos,
                    //total: carrito.total
                })
            }
        ).catch(
            alert("Se ha producido un error, intente nuevamente.")
        ).then((datos) => {
            if (datos.status == 201) {
                alert("Pago realizado correctamente.");
                //navigate("/compras");
            }
        })
    }

    function handleChange(e) {
        setDatos({
            ...datos, [e.target.name]: e.target.value
        })
    }

    function cambiarIcono(e) {
        switch (e) {
            case 1:
                setIcono(mastercard);
                break;
            case 2:
                setIcono(visa);
                break;
            case 3:
                setIcono(maestro);
                break;
            case 4:
                setIcono(amex);
                break;
        }
    }

    function quitarError() {
        setErrIdCuent({ val: false, msg: "" });
        setErrId({ val: false, msg: "" });
        setErrBan({ val: false, msg: "" });
        setErrDig({ val: false, msg: "" });
        setErrNombre({ val: false, msg: "" });
        setErrNum({ val: false, msg: "" });
        setErrSerie({ val: false, msg: "" });
        setErrCod({ val: false, msg: "" });
        setErrPag({ val: false, msg: "" });
    }

    /*tarj: "", nombre: "", id: "", cvv: "", banco: "", pagador: "",
        cod: "", serie: "", idCuenta: "" */
    function detCamposErr() {
        if (tipo == 0) {
            return ["cvv", "nombre", "tarj", "banco"];
        }
        else if (tipo == 1) {
            return ["serie", "pagador", "nombre", "banco", "cod"];
        }
        else {
            return ["idCuenta", "id", "nombre", "banco"];
        }
    }

    function verificador() {
        let res = true;
        const arr = detCamposErr();

        quitarError();

        for (const i of arr) {
            switch (i) {
                case "tarj":
                    if (!valTarj(datos[i])) {
                        setErrNum({
                            val: true, msg: "Debe ingresar solo números, ejemplo: 1111-1111-1111-1111."
                        });
                        res &= false;
                    }
                    break;
                case "cvv":
                    if (!valNum(datos[i], 4)) {
                        setErrDig({
                            val: true, msg: "Son 4 dígitos."
                        });
                        res &= false;
                    }
                    break;
                case "banco":
                    if (!valNom(datos[i])) {
                        setErrBan({
                            val: true, msg: "Ingrese un nombre de banco válido."
                        });
                        res &= false;
                    }
                    break;
                case "nombre":
                    if (!valNom(datos[i])) {
                        setErrNombre({
                            val: true, msg: `Debe ingresar un nombre, ejemplo: "Daniel Sanchez"`
                        });
                        res &= false;
                    }
                    break;
                case "idCuenta":
                    if (!valBanco(datos[i])) {
                        setErrIdCuent({
                            val: true, msg: "Debe ser un id de cuenta, por ejemplo: ZAWE-2341-ASDA."
                        });
                        res &= false;
                    }
                    break;
                case "id":
                    if (!valNum(datos[i])) {
                        setErrId({
                            val: true, msg: "Solo números."
                        });
                        res &= false;
                    }
                    break;

                case "serie":
                    if (!valCheque(datos[i])) {
                        setErrSerie({
                            val: true, msg: "Debe ingresar solo números, ejemplo: 1111-1111."
                        });
                        res &= false;
                    }
                    break;
                case "cod":
                    if (!valNum(datos[i], 4)) {
                        setErrCod({
                            val: true, msg: "Son 4 dígitos."
                        });
                        res &= false;
                    }
                    break;
                case "pagador":
                    if (!valNum(datos[i], 4)) {
                        setErrPag({
                            val: true, msg: "Son 4 dígitos."
                        });
                        res &= false;
                    }
                    break;

            }
        }

        if (res) {
            quitarError();
            setTimeout(() => comprar(), 100);
        }
    }


    return (
        <Card
            sx={{
                maxWidth: "530px"
            }}>
            <CardContent>
                <Stack
                    spacing={2}
                    direction="column"
                    divider={<Divider orientation="horizontal" flexItem />}>
                    <Typography variant='h5' textAlign={"center"}>
                        <b>{titulo}</b>
                    </Typography>
                    <Stack
                        direction="column"
                        alignItems="left"
                        justifyContent="center"
                        spacing={2}>
                        <Typography
                            variant='h6'
                            align='left'>
                            <b>Datos del banco.</b>
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                fullWidth
                                label="Banco"
                                helperText={errBan.msg}
                                name="banco"
                                value={datos.banco}
                                onChange={(e) => handleChange(e)}
                                error={errBan.val}
                                sx={{
                                    maxWidth: "330px"
                                }} />
                            {tipo == 0 && (
                                <FormControl>
                                    <InputLabel id="tipo-cuenta-lbl">Tipo de cuenta</InputLabel>
                                    <Select
                                        labelId='tipo-cuenta-lbl'
                                        label="Tipo de cuenta"
                                        defaultValue={1}>
                                        <MenuItem value={1}>Tarjeta crédito</MenuItem>
                                        <MenuItem value={2}>Tarjeta débito</MenuItem>
                                        <MenuItem value={3}>Ahorros</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                            {tipo == 1 && (
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        defaultValue={hoy}
                                        label="Fecha emisión"
                                        disableFuture
                                        minDate={hoy.subtract(2, 'year')} />
                                </LocalizationProvider>
                            )}
                            {tipo == 2 && (
                                <FormControl>
                                    <InputLabel id="tipo-cuenta-lbl">Tipo de cuenta</InputLabel>
                                    <Select
                                        labelId='tipo-cuenta-lbl'
                                        label="Tipo de cuenta"
                                        sx={{
                                            minWidth: "125px"
                                        }}
                                        defaultValue={1}>
                                        <MenuItem value={1}>Ahorros</MenuItem>
                                        <MenuItem value={2}>Corriente</MenuItem>
                                        <MenuItem value={3}>Nómina</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Stack>
                        <Typography
                            variant='h6'
                            align='left'>
                            <b>{subtitulo}.</b>
                        </Typography>
                        <Stack direction="row" spacing={2} alignItems={"center"}>
                            <img
                                src={icono}
                                alt="icono"
                                width="32px"
                                height="32px"
                            />
                            {tipo == 0 && (
                                <>
                                    <FormControl>
                                        <InputLabel id="tipo-tarj-lbl">Tipo tarjeta</InputLabel>
                                        <Select
                                            id="tipoTarj"
                                            labelId="tipo-tarj-lbl"
                                            label="Tipo tarjeta"
                                            onChange={(e) => cambiarIcono(e.target.value)}
                                            defaultValue={1}>
                                            <MenuItem value={1}>Mastercard</MenuItem>
                                            <MenuItem value={2}>Visa</MenuItem>
                                            <MenuItem value={3}>Maestro</MenuItem>
                                            <MenuItem value={4}>American Express</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        error={errDig.val}
                                        onChange={(e) => handleChange(e)}
                                        name="cvv"
                                        helperText={errDig.msg}
                                        label="CVV/CVC"
                                        sx={{
                                            maxWidth: "100px"
                                        }} />
                                    <TextField
                                        type={"text"}
                                        helperText={errNombre.msg}
                                        onChange={(e) => handleChange(e)}
                                        name="nombre"
                                        label="Nombre titular"
                                        error={errNombre.val}
                                    />
                                </>)}
                            {tipo == 1 && (
                                <>
                                    <TextField
                                        error={errSerie.val}
                                        onChange={(e) => handleChange(e)}
                                        name="serie"
                                        helperText={errSerie.msg}
                                        label="Número de serie"
                                        sx={{
                                            maxWidth: "500px"
                                        }} />
                                    <TextField
                                        type={"text"}
                                        helperText={errPag.msg}
                                        onChange={(e) => handleChange(e)}
                                        name="pagador"
                                        label="Cód. pagador"
                                        error={errPag.val}
                                    />
                                    <TextField
                                        type={"text"}
                                        helperText={errCod.msg}
                                        onChange={(e) => handleChange(e)}
                                        name="cod"
                                        label="Código"
                                        error={errCod.val}
                                    />
                                </>
                            )}
                            {tipo == 2 && (
                                <>
                                    <TextField
                                        type={"text"}
                                        helperText={errIdCuent.msg}
                                        onChange={(e) => handleChange(e)}
                                        name="idCuenta"
                                        label="ID de Cuenta"
                                        error={errIdCuent.val}
                                    />
                                    <TextField
                                        helperText={errId.msg}
                                        onChange={(e) => handleChange(e)}
                                        error={errId.val}
                                        name="id"
                                        label="Num. de identificación" />
                                </>
                            )}
                        </Stack>
                        {tipo == 2 && (
                            <TextField
                                fullWidth
                                helperText={errNombre.msg}
                                onChange={(e) => handleChange(e)}
                                error={errNombre.val}
                                name="nombre"
                                label="Nombre titular" />
                        )}
                        {(tipo == 0 || tipo == 1) && (
                            <Stack direction="row" spacing={2}>
                                {tipo == 0 && (
                                    <>
                                        <TextField
                                            fullWidth
                                            helperText={errNum.msg}
                                            onChange={(e) => handleChange(e)}
                                            error={errNum.val}
                                            name="tarj"
                                            label="Número de tarjeta" />
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                defaultValue={hoy}
                                                disablePast
                                                label="Fecha vencimiento"
                                                maxDate={hoy.add(10, "year")} />
                                        </LocalizationProvider>
                                    </>)}
                                {tipo == 1 && (
                                    <TextField
                                        fullWidth
                                        helperText={errNombre.msg}
                                        onChange={(e) => handleChange(e)}
                                        error={errNombre.val}
                                        name="nombre"
                                        label="Nombre titular" />)}

                            </Stack>)}
                    </Stack>
                    <Stack
                        spacing={2}
                        direction={"row"}>
                        <Button
                            color={"error"}
                            variant='contained'
                            //onClick={() => navigate("/cart", { replace: true })}
                            fullWidth
                            sx={{
                                textTransform: "initial"
                            }}>
                            <b>Cancelar</b>
                        </Button>
                        <Button
                            color={"success"}
                            variant="contained"
                            startIcon={<AttachMoneyIcon />}
                            fullWidth
                            onClick={() => verificador()}
                            sx={{
                                textTransform: "initial"
                            }}>
                            <b>Pagar</b>
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card >
    );
}