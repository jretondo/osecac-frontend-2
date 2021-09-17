import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Input, Label, Row } from 'reactstrap'
import Anulacion from './forms/anulacion'
import CrTransf from './forms/crTransf'
import Depositos from './forms/depositos'
import Embargos from './forms/embargos'
import Pagos from './forms/pagos'
import Rechazo from './forms/rechazo'

const FormsLibro = () => {
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

    useEffect(() => {
        console.log(`tipo`, tipo)
    }, [tipo])
    return (<>
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
    </>)
}

export default FormsLibro