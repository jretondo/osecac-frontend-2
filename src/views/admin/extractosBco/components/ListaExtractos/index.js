import React from 'react'
import {
    CardHeader,
} from "reactstrap"
import ListaExtractosComp from './subComponents/listaExtractos'
import FiltroComp from './subComponents/filtro'

const ListaExtractos = ({
    desde,
    hasta,
    pagina,
    filtro,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall2,
    call2,
    setUltimaPag,
    setPages,
    setDesde,
    setHasta,
    setFiltro,
}) => {
    return (
        <>
            <CardHeader className="border-0">
                <h2 className="mb-0" style={{ textAlign: "center" }}>Extractos Banco de Córdoba</h2>
                <FiltroComp
                    desde={desde}
                    hasta={hasta}
                    setDesde={setDesde}
                    setHasta={setHasta}
                    setFiltro={setFiltro}
                    setMsgStrong={setMsgStrong}
                    setMsgGralAlert={setMsgGralAlert}
                    setSuccessAlert={setSuccessAlert}
                    setAlertar={setAlertar}
                    alertar={alertar}
                />
            </CardHeader>
            <ListaExtractosComp
                desde={desde}
                hasta={hasta}
                pagina={pagina}
                filtro={filtro}
                setActividadStr={setActividadStr}
                nvaActCall={nvaActCall}
                setNvaActCall={setNvaActCall}
                alertar={alertar}
                setAlertar={setAlertar}
                setMsgStrong={setMsgStrong}
                setMsgGralAlert={setMsgGralAlert}
                setSuccessAlert={setSuccessAlert}
                setCall2={setCall2}
                call2={call2}
                setPagina={setPages}
                setUltimaPag={setUltimaPag}
                setPages={setPages}
            />
        </>
    )
}

export default ListaExtractos