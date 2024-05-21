import { useState } from 'react'
import { Button, Stack, TextField, Typography } from "@mui/material"
import { almacenarInformacion } from '@talleres/store'

export default function Root(props) {
	const [data, setData] = useState({
		nombre: "", apellido: "", descripcion: ""
	});

	const handleSubmit = () => {
		almacenarInformacion(data)
	};

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value })
	};

	return (
		<Stack
			direction={"column"}
			spacing={2}>
				<Typography
				variant='h5'
				textAlign={"center"}>
					<b>Formulario para crear un usuario.</b>
				</Typography>
			<TextField
				variant="outlined"
				label="Nombre"
				name="nombre"
				onChange={(e) => handleChange(e)} />
			<TextField
				variant="outlined"
				label="Apellido"
				name="apellido"
				onChange={(e) => handleChange(e)} />
			<TextField
				variant="outlined"
				label="Descripción"
				name="descripcion"
				multiline
				rows={4}
				onChange={(e) => handleChange(e)} />
			<Button
				onClick={handleSubmit}
				variant='contained'
				color='success'
				fullWidth
				sx={{
					textTransform: "capitalize"
				}}>
				<b>Enviar</b>
			</Button>
		</Stack>
	);
}
