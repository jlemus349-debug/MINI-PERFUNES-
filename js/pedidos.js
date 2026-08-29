/*=====================================================
        mini perfumes v0.0
        SISTEMA DE GESTION VENTAS
======================================================*/

/*=====================================================
            NÚMERO DE PEDIDO
======================================================*/

function generarNumeroPedido() {

    const pedidoElemento = document.getElementById("numeroPedido");

    if (!pedidoElemento) return;

    const numero = String(numeroPedido).padStart(4, "0");

    pedidoElemento.textContent = numero;

}

/*=====================================================
                CARRITO DE COMPRAS
======================================================*/

let carrito = [];

function agregarCarrito() {

    const producto =
        document.getElementById("producto");

    const cantidad =
        Number(document.getElementById("cantidad").value);

    const mujer =
        document.getElementById("mujer").value;

    const hombre =
        document.getElementById("hombre").value;

    if (producto.value == 0) {

        alert("Seleccione un tamaño de perfume.");

        return;
    }

    let fragancia = "";

    if (mujer !== "Ninguno") {

        fragancia = mujer;

    } else if (hombre !== "Ninguno") {

        fragancia = hombre;

    } else {

        alert("Seleccione una fragancia.");

        return;
    }

    const precio = Number(producto.value);

    carrito.push({

        fragancia: fragancia,

        tamaño:
            producto.options[
                producto.selectedIndex
            ].text,

        cantidad: cantidad,

        subtotal: precio * cantidad

    });

    mostrarCarrito();

}
function mostrarCarrito() {

    const lista =
        document.getElementById("listaCarrito");

    let html = "";

    let total = 0;

    carrito.forEach((item, index) => {

        html += `

            <div class="item-carrito">

                <p>🧴 ${item.fragancia}</p>

                <p>${item.tamaño}</p>

                <p>Cantidad: ${item.cantidad}</p>

                <p>💰 $${item.subtotal.toLocaleString("es-CO")}</p>

                <hr>

            </div>

        `;

        total += item.subtotal;

    });

    html += `

        <h2 style="color:#D4B16A">

            💎 Total General:
            $${total.toLocaleString("es-CO")}

        </h2>

    `;

    lista.innerHTML = html;
    if (
    mujer !== "Ninguno" &&
    hombre !== "Ninguno"
) {

    alert(
        "Seleccione solo una fragancia: Mujer o Hombre."
    );

    return;
}

}
/*=====================================================
            OBTENER TOTAL DEL PEDIDO
======================================================*/

function obtenerTotal() {

    let total = 0;

    carrito.forEach(item => {

        total += item.subtotal;

    });

    return total;

}

/*=====================================================
            CALCULAR PEDIDO
======================================================*/

function calcularPedido() {

    const clienteInput =
        document.getElementById("cliente");

    const producto =
        document.getElementById("producto");

    const cantidadInput =
        document.getElementById("cantidad");

    const resumen =
        document.getElementById("resumenCompra");

    if (!clienteInput || !producto || !cantidadInput) {

        alert("Faltan controles del formulario.");

        return 0;

    }

    const cliente =
        clienteInput.value.trim();

    if (cliente === "") {

        alert("Ingrese el nombre del cliente.");

        return 0;

    }

    const cantidad =
        Number(cantidadInput.value);

    if (cantidad <= 0) {

        alert("Ingrese una cantidad válida.");

        return 0;

    }

    const total = obtenerTotal();

    if (resumen) {

        let listaProductos = "";

        carrito.forEach(item => {

            listaProductos += `

                <p>
                    🧴 <strong>${item.fragancia}</strong>
                </p>

                <p>
                    ${item.tamaño}
                </p>

                <p>
                    Cantidad: ${item.cantidad}
                </p>

                <p>
                    💰 $${item.subtotal.toLocaleString("es-CO")}
                </p>

                <hr>

            `;

        });

        resumen.innerHTML = `

            <div class="resumen-pedido">

                <p>

                    <strong>Cliente:</strong>

                    ${cliente}

                </p>

                ${listaProductos}

                <h2 style="color:#27ae60">

                    💎 Total:
                    $${total.toLocaleString("es-CO")}

                </h2>

            </div>

        `;

    }

    return total;

}
/*=====================================================
                REALIZAR PEDIDO
======================================================*/

function realizarPedido() {

    /*=========================================
            VALIDAR CAJA ABIERTA
    =========================================*/

    if (!cajaAbierta) {

        alert("⚠ Debe abrir la caja antes de registrar pedidos.");

        return;

    }

    /*=========================================
            VALIDAR CARRITO
    =========================================*/

    if (carrito.length === 0) {

        alert("🧴 Agregue al menos un perfume al carrito.");

        return;

    }

    /*=========================================
            VALIDAR CLIENTE
    =========================================*/

    const cliente =
        document.getElementById("cliente").value.trim();

    if (cliente === "") {

        alert("⚠ Ingrese el nombre del cliente.");

        return;

    }

    /*=========================================
            VALIDAR TELÉFONO
    =========================================*/

    const telefono =
        document.getElementById("telefono").value.trim();

    if (telefono === "") {

        alert("⚠ Ingrese el número de celular.");

        return;

    }

    if (telefono.length !== 10 || isNaN(telefono)) {

        alert("⚠ Ingrese un número de celular válido.");

        return;

    }

    if (!telefono.startsWith("3")) {

        alert("⚠ El número celular debe iniciar por 3.");

        return;

    }

    /*=========================================
            TIPO CLIENTE
    =========================================*/

    const tipoCliente =
        document.getElementById("tipoCliente").value;

    if (tipoCliente === "") {

        alert("⚠ Seleccione el tipo de cliente.");

        return;

    }

    /*=========================================
            CURSO
    =========================================*/

    const curso =
        document.getElementById("curso").value.trim();

    if (curso === "") {

        alert("⚠ Ingrese el curso.");

        return;

    }

    /*=========================================
            CALCULAR PEDIDO
    =========================================*/

    const total = obtenerTotal();

    if (total <= 0) {

        alert("⚠ El pedido no tiene valor.");

        return;

    }

    /*=========================================
            FECHA Y HORA
    =========================================*/

    const ahora = new Date();

    /*=========================================
            CREAR PEDIDO
    =========================================*/

    const pedido = {

        numero: numeroPedido,

        fecha: ahora.toLocaleDateString("es-CO"),

        hora: ahora.toLocaleTimeString("es-CO", {

            hour: "2-digit",

            minute: "2-digit"

        }),

        cliente: cliente,

        telefono: telefono,

        tipoCliente: tipoCliente,

        curso: curso,

        productos: [...carrito],

        total: total,

        metodoPago:
            document.getElementById("metodoPago").value,

        estado: "En preparación"

    };

    /*=========================================
            GUARDAR PEDIDO
    =========================================*/

    pedidos.push(pedido);

    ultimoPedido = pedido;

    numeroPedido++;

    /*=========================================
            ACTUALIZAR CAJA
    =========================================*/

    ventasCaja += pedido.total;

    totalPedidosCaja++;

    switch (pedido.metodoPago) {

        case "Efectivo":
            totalEfectivo += pedido.total;
            break;

        case "Nequi":
            totalNequi += pedido.total;
            break;

        case "Daviplata":
            totalDaviplata += pedido.total;
            break;

        case "Transferencia":
            totalTransferencia += pedido.total;
            break;

        case "Tarjeta":
            totalTarjeta += pedido.total;
            break;

    }

    /*=========================================
            GUARDAR DATOS
    =========================================*/

    guardarPedidos();

    guardarCaja();

    /*=========================================
            ACTUALIZAR PANTALLAS
    =========================================*/

    if (typeof actualizarCaja === "function")
        actualizarCaja();

    if (typeof actualizarDashboard === "function")
        actualizarDashboard();

    if (typeof actualizarReportes === "function")
        actualizarReportes();

    if (typeof actualizarHistorial === "function")
        actualizarHistorial();

    if (typeof actualizarPedidosProceso === "function")
        actualizarPedidosProceso();

    /*=========================================
            TICKET
    =========================================*/

    if (typeof generarTicket === "function")
        generarTicket(pedido);

    /*=========================================
            MENSAJE
    =========================================*/

    alert("✅ Pedido registrado correctamente.");

   /*=====================================================
                LIMPIAR FORMULARIO
======================================================*/

function limpiarFormulario() {

    document.getElementById("cliente").value = "";

    document.getElementById("telefono").value = "";

    document.getElementById("curso").value = "";

    document.getElementById("tipoCliente").selectedIndex = 0;

    document.getElementById("producto").selectedIndex = 0;

    document.getElementById("mujer").selectedIndex = 0;

    document.getElementById("hombre").selectedIndex = 0;

    document.getElementById("cantidad").value = 1;

    const resumen =
        document.getElementById("resumenCompra");

    if (resumen) {

        resumen.innerHTML = "";

    }

    carrito = [];

    const lista =
        document.getElementById("listaCarrito");

    if (lista) {

        lista.innerHTML =
            '<p class="sin-resumen">🧴 No hay perfumes agregados al carrito.</p>';

    }

}

}