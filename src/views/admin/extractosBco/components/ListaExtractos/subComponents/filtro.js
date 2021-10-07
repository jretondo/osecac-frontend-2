import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'
import React, { useState } from 'react'
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label,
    Spinner
} from "reactstrap"
import { DescargarPDF } from '../../../functions'
import ModalGastos from './modalGstos'

const Filtro = ({
    desde,
    hasta,
    setDesde,
    setHasta,
    setFiltro,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setAlertar,
    alertar,
    windowToggle
}) => {
    const [loading, setLoading] = useState(false)
    const [modalToggle, setmodalToggle] = useState(false)
    const [gastos, setGastos] = useState([])

    const ConsultaFechas = (e) => {
        e.preventDefault()
        setFiltro(true)
    }

    const getPDF = async (e) => {
        e.preventDefault()

        await DescargarPDF(desde, hasta)
            .then(res => {
                if (parseInt(res.status) === 200) {
                    setLoading(false)
                    setMsgStrong("Extracto descargado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                } else {
                    setMsgStrong("Hubo un error al querer descargar el Extracto")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                    setLoading(false)
                }
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer descargar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
            })
    }

    const calcGstos = async () => {
        const query = `?desde=${desde}&hasta=${hasta}`
        setLoading(true)
        await axios.get(`${UrlNodeServer.extractosDir.sub.calcGstos}${query}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then((res) => {
                setLoading(false)
                console.log(`res.data`, res.data)
                setGastos(res.data.body)
                setmodalToggle(true)
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer mostrar los Gastos e impuestos")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setLoading(false)
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
            <Form onSubmit={e => ConsultaFechas(e)}>
                <Row form style={{ textAlign: "left" }}>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">Desde:{" "}</Label>
                            <Input type="date" name="desde" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="exampleEmail">Hasta:{" "}</Label>
                            <Input type="date" name="hasta" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} />
                        </FormGroup>
                    </Col>
                    <Col md="6">
                        <Row>
                            <Col >
                                <button
                                    className="btn btn-primary"
                                    disabled={!windowToggle}
                                    style={{ marginTop: "33px" }} type="submit">Filtrar</button>
                                <button className="btn btn-warning" style={{ marginTop: "33px" }} onClick={e => getPDF(e)}>
                                    Descargar PDF
                                </button>
                                <button
                                    className="btn btn-default"
                                    style={{ marginTop: "33px" }}
                                    onClick={e => {
                                        e.preventDefault()
                                        calcGstos()
                                    }}
                                >
                                    Gastos e Imp.
                                </button>
                                <ModalGastos
                                    toggle={modalToggle}
                                    setToggle={setmodalToggle}
                                    data={gastos}
                                    desde={desde}
                                    hasta={hasta}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Filtro