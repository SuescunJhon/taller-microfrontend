import {obtenerInformacion, subscribe, unsubscribe} from "@talleres/store"
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

  return <>
    <h1>{props.name} Listar </h1>
    <ul>{items.map(item => <li key={item.id}>{ `${item.nombre} ${item.apellido}: ${item.descripcion}`}</li>)}</ul>
  </> 
}
