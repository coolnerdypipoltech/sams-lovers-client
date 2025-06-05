


export function formatDate(fechaInicio, fechaFin) {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  const diaInicio = String(inicio.getDate()).padStart(2, '0');
  const mesInicio = meses[inicio.getMonth()];
  const diaFin = String(fin.getDate()).padStart(2, '0');
  const mesFin = meses[fin.getMonth()];
  const año = fin.getFullYear();

  return `${mesInicio} ${diaInicio} a ${mesFin} ${diaFin} del ${año}`;
}


