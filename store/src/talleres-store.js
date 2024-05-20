// Anything exported from this file is importable by other in-browser modules.
const observers = []

export function almacenarInformacion(valor) {
    const id = localStorage.length.toString()
    valor["id"] = id
    const value = JSON.stringify(valor)
    localStorage.setItem(id, value)
    notifyObservers(obtenerInformacion())
}

export function obtenerInformacion() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
}

function notifyObservers(items) {
    observers.forEach(observer => observer(items));
}
  
export const subscribe = (observer) => {
    observers.push(observer);
};

export const unsubscribe = (observer) => {
    observers = observers.filter(o => o !== observer);
};