import React, { useEffect, useState } from "react"
import axios from 'axios'
import FilaMov from '../../../../../../components/subComponents/Listados/SubComponentes/FilaMov'
import ListadoTable from '../../../../../../components/subComponents/Listados/ListadoTable'
import UrlNodeServer from '../../../../../../api/NodeServer'
import {
    Spinner
} from "reactstrap"

const titulos = ["Fecha", "Saldo Inicial", "Mov. del Día", "Saldo Final", ""]

const ListaExtractos = ({
    fecha,
    filtroStr,
    filtroBool,
    pagina,
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
    setPagina,
    setUltimaPag,
    setPages
}) => {
    const [listado, setListado] = useState(<></>)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        listar()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (filtroBool) {
            listar()
            setPagina(1)
        }
        // eslint-disable-next-line
    }, [filtroBool])

    useEffect(() => {
        listar()
        // eslint-disable-next-line
    }, [pagina])

    useEffect(() => {
        listar()
        setPagina(1)
        // eslint-disable-next-line
    }, [call2])

    const listar = async () => {
        let query = ""
        if (filtroBool) {
            query = `?fecha=${fecha}&filtro=${filtroStr}`
        } else {
            query = `?fecha=${fecha}`
        }
        setLoading(true)
        await axios.get(UrlNodeServer.listaMov + pagina + query, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setLoading(false)
                const data = res.data.body
                if (parseInt(data.pages.cantTotal) > 0) {
                    setUltimaPag(data.pages.totalPag)
                    setPages(data.pages)
                    setListado(
                        data.listado.map((item, key) => {
                            let primero
                            if (key === 0) {
                                primero = true
                            } else {
                                primero = false
                            }
                            return (
                                <FilaMov
                                    id={key}
                                    key={key}
                                    item={item}
                                    setActividadStr={setActividadStr}
                                    nvaActCall={nvaActCall}
                                    setNvaActCall={setNvaActCall}
                                    alertar={alertar}
                                    setAlertar={setAlertar}
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setCall={setCall2}
                                    call={call2}
                                    setEsperar={setLoading}
                                    primero={primero}
                                    pagina={pagina}
                                    setPagina={setPagina}
                                />
                            )
                        })
                    )
                } else {
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay movimientos cargados
                            </td>
                        </tr>
                    )
                }
            })
            .catch(() => {
                setLoading(false)
                setListado(
                    <tr style={{ textAlign: "center", width: "100%" }}>
                        <td>
                            No hay movimientos cargados
                        </td>
                    </tr>
                )
            })
    }
    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else {
        return (
            <ListadoTable
                listado={listado}
                titulos={titulos}
            />
        )
    }
}

export default ListaExtractos