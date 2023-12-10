function calcularPrestamo() {
  const montoPrestamo = parseFloat(document.getElementById('monto').value);
  const tasaInteresAnual = parseFloat(document.getElementById('tasa').value);
  const periodoMeses = parseInt(document.getElementById('periodo').value);

  if (!isNaN(montoPrestamo) && !isNaN(tasaInteresAnual) && !isNaN(periodoMeses)) {
    const tasaInteresMensual = (tasaInteresAnual / 100) / 12;
    const cuotaMensual = (montoPrestamo * tasaInteresMensual) / (1 - Math.pow(1 + tasaInteresMensual, -periodoMeses));
    const totalPagar = cuotaMensual * periodoMeses;

    document.getElementById('cuotaMensual').innerHTML = `Pago mensual: $${cuotaMensual.toFixed(2)}`;
    document.getElementById('totalPagar').innerHTML = `Monto total a pagar: $${totalPagar.toFixed(2)}`;

    // Mostrar tabla de desglose de pagos
    mostrarDesglosePagos(montoPrestamo, tasaInteresMensual, periodoMeses, cuotaMensual);
  } else {
    document.getElementById('cuotaMensual').innerHTML = 'Por favor, ingresa números válidos en todos los campos';
    document.getElementById('totalPagar').innerHTML = '';
    document.getElementById('desglosePagos').innerHTML = '';
  }
}

function mostrarDesglosePagos(montoPrestamo, tasaInteresMensual, periodoMeses, cuotaMensual) {
  let html = '<h2>Desglose de Pagos</h2>';
  html += '<table>';
  html += '<tr><th>Mes</th><th>Pago Mensual</th><th>Saldo Pendiente</th></tr>';

  let saldoPendiente = montoPrestamo;
  for (let mes = 1; mes <= periodoMeses; mes++) {
    const interesPago = saldoPendiente * tasaInteresMensual;
    const capitalPago = cuotaMensual - interesPago;
    saldoPendiente -= capitalPago;

    html += `<tr><td>${mes}</td><td>$${cuotaMensual.toFixed(2)}</td><td>$${saldoPendiente.toFixed(2)}</td></tr>`;
  }

  html += '</table>';
  document.getElementById('desglosePagos').innerHTML = html;
}
