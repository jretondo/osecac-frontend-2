import index from "views/admin/dashboard"
import extractosBco from 'views/admin/extractosBco'
import conciliacionBco from 'views/admin/conciliacionBco'
import adminUsu from 'views/admin/adminUsu'
import libroBco from 'views/admin/libroBco'
import pagoAgencias from 'views/admin/pagoAgencias'
import pagoPrestadores from 'views/admin/pagoPrestadores'
import pagoProveedores from 'views/admin/pagoProveedores'
import rendicionesCoseguro from 'views/admin/rendicionesCoseguro'

let routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/extractosBco",
    name: "Extractos Bancarios",
    icon: "ni ni-tag text-red",
    component: extractosBco,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/conciliacionBco",
    name: "Conciliación Bancaria",
    icon: "ni ni-tag text-red",
    component: conciliacionBco,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/libroBco",
    name: "Libro Banco",
    icon: "ni ni-tag text-red",
    component: libroBco,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/pagoAgencias",
    name: "Pago a Agencias",
    icon: "ni ni-tag text-red",
    component: pagoAgencias,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/pagoPrestadores",
    name: "Pago a Prestadores",
    icon: "ni ni-tag text-red",
    component: pagoPrestadores,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/pagoProveedores",
    name: "Pago a Proveedores",
    icon: "ni ni-tag text-red",
    component: pagoProveedores,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/rendicionesCoseguro",
    name: "Rendiciones de Coseguro",
    icon: "ni ni-tag text-red",
    component: rendicionesCoseguro,
    layout: process.env.PUBLIC_URL + "/admin"
  },
  {
    path: "/adminUsu",
    name: "Administración de Usuarios",
    icon: "ni ni-tag text-red",
    component: adminUsu,
    layout: process.env.PUBLIC_URL + "/admin"
  }
];
export default routes;
