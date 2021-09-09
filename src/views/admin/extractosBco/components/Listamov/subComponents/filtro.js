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
    alertar
}) => {
    const [loading, setLoading] = useState(false)

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
                                <button className="btn btn-primary" style={{ marginTop: "33px" }} type="submit">Filtrar</button>
                                <button className="btn btn-warning" style={{ marginTop: "33px" }} onClick={e => getPDF(e)}>
                                    Descargar PDF
                                </button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Filtro