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

const userDir = {
    user
}

const permissionsDir = {
    permissions
}

const authDir = {
    auth,
    sub: {
        login: auth + "/login",
        changePass: auth + "/changePass"
    }
}

const routesDir = {
    routes,
    sub: {
        adminUsu: routes + "/adminUsu",
        libroBanco: routes + "/libroBanco",
        extractosbancarios: routes + "/extractosbancarios",
        pagoProveedores: routes + "/pagoProveedores",
        pagoAgencias: routes + "/pagoAgencias",
        pagoPrestadores: routes + "/pagoPrestadores",
        conciliacionBancaria: routes + "/conciliacionBancaria",
        rendicionesCoseguro: routes + "/rendicionesCoseguro",
        fiscalizacion: routes + "/fiscalizacion",
        dashboard: routes + "/dashboard",
        changePass: routes + "/changePass"
    }
}

const extractosDir = {
    extractos,
    sub: {
        process: extractos + "/process",
        list: extractos + "/list/",
        download: extractos + "/download/",
        removeId: extractos + "/removeId/"
    }
}

const UrlNodeServer = {
    userDir,
    permissionsDir,
    authDir,
    routesDir,
    extractosDir
}

export default UrlNodeServer