# Taller microsfrontends

## ¿Cómo ejecutarlo?

Ingrese a cada una de las carpetas y ejecutelo en el siguiente orden:

1. Inicie el store, en una terminal ingrese los comandos:
```
cd store
npm i
npm start
``` 

2. Cuando el store haya iniciado, en una terminal distinta para cada app. inicie c/u con los comandos:
```
cd <app1,appr2,app3>
npm i
npm start
``` 

3. Cuando todas las apps. se haya iniciado, inicie el orquestador (aplicación "root").
```
cd root
npm i
npm start
```

## Rutas.

- **Principal:** ```localhost:9000```
- **Formulario de pago (aplicación 3):** ```localhost:9000/checkout/```