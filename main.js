// Variables globales para almacenar datos de pagos mensuales y saldos pendientes
let pagosMensuales = [];
let saldosPendientes = [];

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
  pagosMensuales = [];
  saldosPendientes = [];
  let saldoPendiente = montoPrestamo;

  for (let mes = 1; mes <= periodoMeses; mes++) {
    const interesPago = saldoPendiente * tasaInteresMensual;
    const capitalPago = cuotaMensual - interesPago;
    saldoPendiente -= capitalPago;

    pagosMensuales.push(cuotaMensual.toFixed(2));
    saldosPendientes.push(saldoPendiente.toFixed(2));
  }

  // Mostrar tabla con arrays de pagos mensuales y saldos pendientes
  mostrarTablaDesglose(pagosMensuales, saldosPendientes);

  // Ejemplos de uso de find(), filter() y some()
  const pagoMayor80 = pagosMensuales.find(pago => parseFloat(pago) > 80);
  const pagosMayores90 = pagosMensuales.filter(pago => parseFloat(pago) > 90);
  const hayPagoMayor100 = pagosMensuales.some(pago => parseFloat(pago) > 100);

  // Mostrar resultados en el HTML
  mostrarResultadosBusqueda(pagoMayor80);
  mostrarResultadosFiltrado(pagosMayores90);
  mostrarResultadoSome(hayPagoMayor100);
}

function mostrarTablaDesglose(pagosMensuales, saldosPendientes) {
  let html = '<h2>Desglose de Pagos</h2>';
  html += '<table>';
  html += '<tr><th>Mes</th><th>Pago Mensual</th><th>Saldo Pendiente</th></tr>';

  for (let i = 0; i < pagosMensuales.length; i++) {
    html += `<tr><td>${i + 1}</td><td>$${pagosMensuales[i]}</td><td>$${saldosPendientes[i]}</td></tr>`;
  }

  html += '</table>';
  document.getElementById('desglosePagos').innerHTML = html;
}

function mostrarResultadosBusqueda(pagoMayor80) {
  const resultadosBusqueda = document.getElementById('resultadosBusqueda');
  resultadosBusqueda.innerHTML = `<p>Primer pago mayor a 80: ${pagoMayor80 || 'No encontrado'}</p>`;
}

function mostrarResultadosFiltrado(pagosMayores90) {
  const resultadosFiltrado = document.getElementById('resultadosFiltrado');
  resultadosFiltrado.innerHTML = `<p>Pagos mayores a 90: ${pagosMayores90.join(', ') || 'No encontrados'}</p>`;
}

function mostrarResultadoSome(hayPagoMayor100) {
  const resultadoSome = document.getElementById('resultadoSome');
  resultadoSome.innerHTML = `<p>¿Hay algún pago mayor a 100? ${hayPagoMayor100 ? 'Sí' : 'No'}</p>`;
}
