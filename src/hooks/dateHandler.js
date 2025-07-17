export function formatDate(fechaInicio, fechaFin) {
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Agto", "Sept", "Oct", "Nov", "Dic"
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

export function formatOneDate(fecha) {
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Agto", "Sept", "Oct", "Nov", "Dic"
  ];

  const date = new Date(fecha);

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = meses[date.getMonth()];
  const año = date.getFullYear();

  return `${mes} ${dia} del ${año}`;
}
