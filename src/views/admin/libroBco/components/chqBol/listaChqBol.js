import ListadoTable from '../../../../../components/subComponents/Listados/ListadoTable'
import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'reactstrap'
import Row from 'reactstrap/lib/Row'
import axios from 'axios'
import UrlNodeServer from '../../../../../api/NodeServer'
import ModalNewTal from './modalNewTal'
import FilaBolChq from '../../../../../components/subComponents/Listados/SubComponentes/FilaBolChq'

const titulos = ["Desde", "Hasta", ""]

const ListaChqBol = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    setNvaActCall,
    setActividadStr,
    alertar,
    setAlertar
}) => {
    const [nvoTalBool, setNvoTalBool] = useState(false)
    const [loading, setLoading] = useState(false)
    const [listaChq, setListaChq] = useState(<tr><td>No hay chequeras cargadas</td></tr>)
    const [listaBol, setListaBol] = useState(<tr><td>No hay boletas cargadas</td></tr>)
    const [totalChq, setTotalChq] = useState(0)
    const [totalBol, setTotalBol] = useState(0)
    const [call, setCall] = useState(false)

    useEffect(() => {
        ListaTalonarios()
        // eslint-disable-next-line
    }, [])

    const toggle = () => {
        setNvoTalBool(!nvoTalBool)
    }

    const ListaTalonarios = async () => {
        await axios.get(UrlNodeServer.libroBcoDir.sub.talonarios, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    const listaBol = respuesta.body.listadoBol
                    const listaChq = respuesta.body.listadoChq
                    if (listaBol.length > 0) {
                        setListaBol(
                            // eslint-disable-next-line
                            listaBol.map((item, key) => {
                                return (
                                    <FilaBolChq
                                        key={key}
                                        id={key}
                                        item={item}
                                        setActividadStr={setActividadStr}
                                        nvaActCall={nvaActCall}
                                        setNvaActCall={setNvaActCall}
                                        alertar={alertar}
                                        setAlertar={setAlertar}
                                        setMsgStrong={setMsgStrong}
                                        setMsgGralAlert={setMsgGralAlert}
                                        setSuccessAlert={setSuccessAlert}
                                        setCall={setCall}
                                        call={call}
                                        setEsperar={setLoading}
                                    />
                                )
                            })
                        )
                    }
                    if (listaChq.length > 0) {
                        setListaChq(
                            // eslint-disable-next-line
                            listaChq.map((item, key) => {
                                return (
                                    <FilaBolChq
                                        key={key}
                                        id={key}
                                        item={item}
                                        setActividadStr={setActividadStr}
                                        nvaActCall={nvaActCall}
                                        setNvaActCall={setNvaActCall}
                                        alertar={alertar}
                                        setAlertar={setAlertar}
                                        setMsgStrong={setMsgStrong}
                                        setMsgGralAlert={setMsgGralAlert}
                                        setSuccessAlert={setSuccessAlert}
                                        setCall={setCall}
                                        call={call}
                                        setEsperar={setLoading}
                                    />
                                )
                            })
                        )
                    }
                } else {
                    setMsgStrong("Hubo un error inesperado!")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch(() => {
                setMsgStrong("Hubo un error inesperado!")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    return (
        <>
            <Row>
                <Col md="6" style={{ border: "2px solid red", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }} >Chequeras en uso</h3>
                    <ListadoTable
                        titulos={titulos}
                        listado={listaChq}
                    />
                </Col>
                <Col md="6" style={{ border: "2px solid red", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }}>Boletas en uso</h3>
                    <ListadoTable
                        titulos={titulos}
                        listado={listaBol}
                    />
                </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
                <Col md="6">
                    <FormGroup>
                        <Label >Chequeras pendientes de uso</Label>
                        <Input type="text" value={totalChq} disabled />
                    </FormGroup>
                </Col>
                <Col md="6">
                    <FormGroup>
                        <Label >Boletas pendientes de uso</Label>
                        <Input type="text" value={totalBol} disabled />
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md="12" style={{ textAlign: "center", padding: "20px" }}>
                    <button className="btn btn-primary" onClick={e => setNvoTalBool(true)}>
                        Agregar Nuevo Talonario
                    </button>
                </Col>
            </Row>
            <ModalNewTal
                toggle={toggle}
                nvoTalBool={nvoTalBool}
                setMsgStrong={setMsgStrong}
                setMsgGralAlert={setMsgGralAlert}
                setSuccessAlert={setSuccessAlert}
                nvaActCall={nvaActCall}
                setNvaActCall={setNvaActCall}
                setActividadStr={setActividadStr}
                alertar={alertar}
                setAlertar={setAlertar}
            />
        </>
    )
}

export default ListaChqBol