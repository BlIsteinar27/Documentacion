// useMiHook.js
import { useState, useEffect } from "react";

function useMiHook(paramInicial) {
  // 1. Estados internos
  const [valor, setValor] = useState(paramInicial);

  // 2. Efectos colaterales
  useEffect(() => {
    console.log("El valor cambió:", valor);
  }, [valor]);

  // 3. Funciones que quieras exponer
  const reset = () => setValor(paramInicial);

  // 4. Devuelves lo que otros componentes necesiten
  return { valor, setValor, reset };
}

export default useMiHook;


import { useState, useEffect } from "react";

/**
 * useMiHookPersonalizado
 * @param {any} initialValue - Valor inicial del estado
 * @returns {[any, function]} - Devuelve estado y funciones que lo manipulan
 */
export function useMiHookPersonalizado(initialValue) {
  // 1. Estado interno
  const [value, setValue] = useState(initialValue);

  // 2. Efectos colaterales (opcional)
  useEffect(() => {
    // lógica que quieres ejecutar cuando value cambia
    console.log("Nuevo valor:", value);
  }, [value]);

  // 3. Funciones auxiliares (API del hook)
  const reset = () => setValue(initialValue);

  // 4. Retorno: estado + API
  return { value, setValue, reset };
}
