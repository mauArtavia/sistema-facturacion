POS
├── Ventas
│   ├── Ventas en curso
│   │   ├── Generar Nueva Venta : Abre una nueva venta, con identificador de mesa.
│   │   ├── Mesa 1: Venta abierta de mesa #1.
│   │   ├── ...
│   │   └── Mesa N: Venta abierta de mesa #N.
│   ├── Ventas rapidas : Abre una venta rapida nueva, para venta en mostrador.
│   ├── Historial : Muestra un pequeno resumen del total de ventas (tanto cantidad de ventas, como total recaudado), como un historial de ventas con el total, metodo de pago, fecha y hora.
│   └── Reportes : Aqui el usuario puede seleccionar el rango, ya sea hoy, semana, mes, ultimos 7 o 31 dias, mostrarlo en tabla en la web, o descargarlo como csv o pdf.
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets
│   │   │   ├── icons
│   │   │   └── images
│   │   ├── components
│   │   │   ├── charts
│   │   │   │   └── PieChartCard.jsx
│   │   │   ├── common
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Toast.jsx
│   │   │   └── ui
│   │   │       ├── Button.jsx
│   │   │       ├── Card.jsx
│   │   │       ├── Input.jsx
│   │   │       └── Select.jsx
│   │   ├── constants
│   │   │   └── paymentMethods.js
│   │   ├── hooks
│   │   │   ├── useProducts.js
│   │   │   ├── useReport.js
│   │   │   └── useSales.js
│   │   ├── layout
│   │   │   ├── MainLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── main.jsx
│   │   ├── pages
│   │   │   ├── dashboard
│   │   │   │   └── DashboardPage.jsx
│   │   │   ├── employees
│   │   │   │   ├── CreateEmployee.jsx
│   │   │   │   └── EmployeesPage.jsx
│   │   │   ├── products
│   │   │   │   ├── CreateProduct.jsx
│   │   │   │   ├── ProductsList.jsx
│   │   │   │   └── ProductsPage.jsx
│   │   │   ├── reports
│   │   │   │   ├── DateRangeReport.jsx
│   │   │   │   ├── MethodReport.jsx
│   │   │   │   ├── ReportsPage.jsx
│   │   │   │   └── SalesReports.jsx
│   │   │   ├── sales
│   │   │   │   ├── components
│   │   │   │   │   ├── charts
│   │   │   │   │   │   └── PieChartCard.jsx
│   │   │   │   │   ├── CreateProductCard.jsx
│   │   │   │   │   ├── DateRangeCard.jsx
│   │   │   │   │   ├── RegisterSaleCard.jsx
│   │   │   │   │   └── SalesHistoryCard.jsx
│   │   │   │   └── SalesPage.jsx
│   │   │   └── settings
│   │   │       └── SettingsPage.jsx
│   │   ├── routes
│   │   │   └── AppRouter.jsx
│   │   ├── services
│   │   │   ├── api.js
│   │   │   ├── productService.js
│   │   │   └── salesService.js
│   │   ├── styles
│   │   │   ├── global.css
│   │   │   └── styles.js
│   │   └── utils
│   │       ├── datePresets.js
│   │       ├── filterSales.js
│   │       └── formatters.js
│   └── vite.config.js
├── readme.md
├── structure.md
└── todolist.md

POS
├── ⚡ VENTAS (Operación en Vivo)
│   ├── [BOTONES DE ACCIÓN RÁPIDA]
│   │   ├── + Nueva Mesa (Abre selector de mesas)
│   │   └── ⚡ Venta Rápida (Directo a menú - para autobuses)
│   │
│   └── [PANEL DE CUENTAS ABIERTAS]
│       ├── Mesa #1 (Total acumulado: ₡XXXX) -> Esto abre un panel para seguir modificando la venta, o para cobrarla.
│       ├── Mesa #5 (Total acumulado: ₡XXXX) -> Esto abre un panel para seguir modificando la venta, o para cobrarla.
│       └── ... (Otras mesas ocupadas)
│
├── 🕒 HISTORIAL (Revisión de Ventas)
│   ├── Lista de Ventas Cerradas (Orden: Recientes primero)
│   │   └── Detalle de Venta (Ver productos, hora y método de pago)
│   └── Resumen del Turno (Total recaudado + cantidad de tickets)
│
└── 📊 REPORTES (Administración)
    ├── Filtros (Hoy, 7 días, 30 días, Rango manual)
    ├── Visualización de Datos (Tabla de ingresos / Productos más vendidos)
    └── Exportación (Botones: Descargar CSV / Descargar PDF)



Colores

const colors = {
  primary: "#3D848F",     // base
  primaryDark: "#2F6B73", // hover / activo fuerte
  primaryLight: "#5FA6B1",// hover suave
  primarySoft: "#A7D1D7", // fondo leve
  border: "#2A5A60",      // bordes activos
  textOnPrimary: "#FFFFFF",
  textMuted: "#CCCCCC"
};