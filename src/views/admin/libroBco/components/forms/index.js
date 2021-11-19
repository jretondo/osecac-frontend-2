import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Anulacion from './anulacion'
import CrTransf from './crTransf'
import Depositos from './depositos'
import Embargos from './embargos'
import Pagos from './pagos'
import Rechazo from './rechazo'

const FormsLibro = () => {
    const [nvoMovBool, setNvoMovBool] = useState(true)
    const [tipo, setTipo] = useState(0)
    const [fecha, setFecha] = useState("")
    const [descrSm, setDescrSm] = useState("")
    const [descrLgBool, setDescrLgBool] = useState(false)
    const [descrLg, setDescrLg] = useState(false)
    const [nroCbte, setNroCbte] = useState("")
    const [nroOp, setNroOp] = useState("")
    const [impNeto, setImpNeto] = useState("")
    const [haber, setHaber] = useState("")
    const [debe, setDebe] = useState("")
    const [retMun, setRetMun] = useState("")
    const [retGcias, setRetGcias] = useState("")
    const [tipoLibro, setTipoLibro] = useState(0)
    const [windowToggle, setWindowToggle] = useState(false)

    useEffect(() => {
        console.log(`tipo`, tipo)
    }, [tipo])

    if (windowToggle) {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle=" Libro Banco"
                    />
                </CardHeader>
                <CardBody>
                    <Row className="align-items-center">
                        <Col md="8" >
                            {
                                nvoMovBool ?
                                    <h3>Nuevo Movimiento en Libro Banco Córdoba</h3> :
                                    <h2 className="mb-0">Libro Banco</h2>
                            }
                        </Col>
                        <Col md="4" style={{ textAlign: "right" }} >
                            {
                                nvoMovBool ?
                                    <button
                                        onClick={e => {
                                            e.preventDefault()
                                            setNvoMovBool(false)
                                        }}
                                        className="btn btn-danger">
                                        X
                                    </button> :
                                    <button
                                        onClick={e => {
                                            e.preventDefault()
                                            setNvoMovBool(true)
                                        }}
                                        className="btn btn-primary">
                                        Nuevo Movimiento
                                    </button>
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label for="exampleSelect">Tipo de Movimiento</Label>
                                <Input onChange={(e) => setTipo(e.target.value)} type="select" name="select" id="exampleSelect">
                                    <option value={0}>Pagos</option>
                                    <option value={1}>Depositos</option>
                                    <option value={2}>Créd. Transferencia</option>
                                    <option value={3}>Anulación de Comprobantes</option>
                                    <option value={4}>Embargos a Cta. Cte.</option>
                                    <option value={5}>Rechazo de Déposito</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    {
                        parseInt(tipo) === 0 ?
                            <Pagos /> : null
                    }
                    {
                        parseInt(tipo) === 1 ?
                            <Depositos /> : null
                    }
                    {
                        parseInt(tipo) === 2 ?
                            <CrTransf /> : null
                    }
                    {
                        parseInt(tipo) === 3 ?
                            <Anulacion /> : null
                    }
                    {
                        parseInt(tipo) === 4 ?
                            <Embargos /> : null
                    }
                    {
                        parseInt(tipo) === 5 ?
                            <Rechazo /> : null
                    }
                </CardBody>
            </Card>)
    } else {
        return (
            <Card className="shadow">
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                        tittle=" Libro Banco"
                    />
                </CardHeader>
            </Card>
        )
    }
}

export default FormsLibro