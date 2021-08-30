let host = ""
if (process.env.NODE_ENV === "development") {
    host = "http://192.168.0.11:3001/api"
} else {
    host = "http://172.21.10.25:3000/api"
}

const user = host + "/user"
const permissions = host + "/permissions"
const auth = host + "/auth"
const routes = host + "/routes"
const extractos = host + "/extractos"

const login = auth + "/login"

const adminUsu = routes + "/adminUsu"
const librobanco = routes + "/libroBanco"
const extractosbancarios = routes + "/extractosbancarios"
const pagoProveedores = routes + "/pagoProveedores"
const pagoAgencias = routes + "/pagoAgencias"
const pagoPrestadores = routes + "/pagoPrestadores"
const conciliacionBancaria = routes + "/conciliacionBancaria"
const rendicionesCoseguro = routes + "/rendicionesCoseguro"
const fiscalizacion = routes + "/fiscalizacion"
const dashboard = routes + "/dashboard"
const changePass = routes + "/changePass"
const aplyNewPass = auth + "/changePass"

const procesarExrtactos = extractos + "/process"
const removeExtracto = extractos + "/remove/"
const extractoslist = extractos + "/list/"
const extractosDownload = extractos + "/download/"

const UrlNodeServer = {
    user,
    permissions,
    auth,
    login,
    adminUsu,
    librobanco,
    extractosbancarios,
    pagoAgencias,
    pagoProveedores,
    pagoPrestadores,
    conciliacionBancaria,
    rendicionesCoseguro,
    fiscalizacion,
    dashboard,
    changePass,
    aplyNewPass,
    procesarExrtactos,
    removeExtracto,
    extractoslist,
    extractosDownload
}

export default UrlNodeServer