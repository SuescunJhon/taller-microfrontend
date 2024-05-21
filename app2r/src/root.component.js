import { obtenerInformacion, subscribe, unsubscribe } from "@talleres/store"
import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";

export default function Root(props) {
	const [items, setItems] = useState(() => {
		const info = obtenerInformacion()
		console.log(info)
		return info
	});

	useEffect(() => {
		const subscription = subscribe((values) => {
			setItems(values);
		});

		return () => {
			if (subscription) {
				unsubscribe(subscription);
			}
		};
	}, []);

	return (
		<Stack
		spacing={2}
		direction={"column"}
		justifyContent={"left"}
		alignContent={"left"}
		alignItems={"center"}>
			<Typography
				variant="h5"
				textAlign={"center"}>
				<b>Lista de usuarios.</b>
			</Typography>
			<ul>
				{items.map(item => {
					return (<li key={item.id}>
						<Typography variant={"body1"}>
						<b>{item.nombre} {item.apellido}:</b> {item.descripcion}
						</Typography>
					</li>)
				})}
			</ul>
		</Stack>
	);
}
