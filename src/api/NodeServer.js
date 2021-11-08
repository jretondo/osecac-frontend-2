let host = ""
if (process.env.NODE_ENV === "development") {
    host = "http://172.21.10.60:3001/api"
} else {
    host = "http://172.21.10.25:3000/api"
}

const user = host + "/user"
const permissions = host + "/permissions"
const auth = host + "/auth"
const routes = host + "/routes"
const extractos = host + "/extractos"
const conciliacion = host + "/conciliacion"
const proveedores = host + "/proveedores"
const actividadApp = host + "/actividadApp"

const userDir = {
    user,
    sub: {
        getUser: user + "/get",
        recPass: user + "/recPass"
    }
}

const actividadAppDir = {
    actividadApp
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

const proveedoresDir = {
    proveedores,
    sub: {
        getOne: proveedores + "/get",
        newTxt: proveedores + "/newTxt",
        list2: proveedores + "/list2"
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

const conciliacionDir = {
    conciliacion,
    sub: {
        transferencias: conciliacion + "/transf",
        download: extractos + "/download/"
    }
}

const extractosDir = {
    extractos,
    sub: {
        process: extractos + "/process",
        list: extractos + "/list/",
        download: extractos + "/download/",
        removeId: extractos + "/removeId/",
        calcGstos: extractos + "/calcGstos",
        sinAsignar: extractos + "/sin",
        tiposmov: extractos + "/tiposMov"
    }
}

const UrlNodeServer = {
    userDir,
    permissionsDir,
    authDir,
    routesDir,
    extractosDir,
    conciliacionDir,
    proveedoresDir,
    actividadAppDir
}

export default UrlNodeServer