export function valPsw(val) {
    const tam = (val.length > 5) && (val.length < 41)
    const exprReg = /^[ \wñÑáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙ(.)@!ºª#($)%&¬=(?)¡¿<>{}~"ç(:)]+$/;

    return val.length > 5 && exprReg.test(val) && tam;
}

export function valNom(val) {
    const exprReg = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    const tam = (val.length > 4) && (val.length < 91)

    return tam && exprReg.test(val) && !valNum(val);
}

export function valDir(val) {
    const exprReg = /^([a-zA-Z]+|[a-zA-Z]+[.])\s(\d+[A-Za-z]*|\d+\s[A-Za-z]+)\s(n.|N.|N|n|nº|Nº|#|n.\s|N.\s|N\s|n\s|nº\s|Nº\s|#\s)\d+[A-Za-z]*-\d+[ \w]*$/;
    return exprReg.test(val) && val.length < 121;
}

export function valTel(val) {
    return valNum(val) && val.length >= 7 && val.length <= 10;
}

export function valNum(val, tam) {
    const exprReg = /^\d+$/;

    if (tam != undefined) {
        return exprReg.test(val) && val.length == tam;
    }
    else {
        return exprReg.test(val);
    }
}

export function valEmail(val) {
    const exprReg = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

    return exprReg.test(val) && val.length < 71;
}

export function valTarj(val) {
    const exprReg = /^(\d{4}-){3}\d{4}$/

    return exprReg.test(val);
}

export function valCheque(val) {
    const exprReg = /^\d{4}-\d{4}$/

    return exprReg.test(val);
}

export function valBanco (val) {
    const exprReg =  /^(\w{4}-){2}\w{4}$/

    return exprReg.test(val);
}