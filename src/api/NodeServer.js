let host = ""
if (process.env.NODE_ENV === "development") {
    host = "http://172.21.10.150:3001/api"
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
const libroBco = host + "/libroBco"
const prestadores = host + "/prestadores"
const transferencias = host + "/transferencias"

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

const prestadoresDir = {
    prestadores,
    sub: {
        lista: prestadores + "/list"
    }
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
        changePass: routes + "/changePass",
        transferencias: routes + "/transferencias"
    }
}

const conciliacionDir = {
    conciliacion,
    sub: {
        transferencias: conciliacion + "/transf",
        download: conciliacion + "/download/",
        excel: conciliacion + "/excel/"
    }
}

const transferenciasDir = {
    transferencias: transferencias,
    sub: {
        transferencias: transferencias + "/transf",
        download: transferencias + "/download/",
        excel: transferencias + "/excel/"
    }
}

const extractosDir = {
    extractos,
    sub: {
        process: extractos + "/process",
        process1: extractos + "/process1",
        processDef: extractos + "/processDef",
        replaceImp: extractos + "/replaceImp",
        list: extractos + "/list/",
        download: extractos + "/download/",
        removeId: extractos + "/removeId/",
        calcGstos: extractos + "/calcGstos",
        sinAsignar: extractos + "/sin",
        tiposmov: extractos + "/tiposMov",
        busqueda: extractos + "/busqueda"
    }
}

const libroBcoDir = {
    libroBco,
    sub: {
        talonarios: libroBco + "/talonarios",
        verificaTalonario: libroBco + "/talonarios/verifica",
        siguientesTal: libroBco + "/talonarios/siguientes",
        verificaNum: libroBco + "/talonarios/verificaNum"
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
    actividadAppDir,
    libroBcoDir,
    prestadoresDir,
    transferenciasDir
}

export default UrlNodeServer