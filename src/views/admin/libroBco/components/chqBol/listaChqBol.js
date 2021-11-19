import ListadoTable from '../../../../../components/subComponents/Listados/ListadoTable'
import React from 'react'
import { Col } from 'reactstrap'
import Row from 'reactstrap/lib/Row'

const titulos = ["Desde", "Hasta", ""]

const ListaChqBol = () => {

    return (
        <>
            <Row>
                <Col md="6" style={{ border: "2px solid red", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }} >Chequeras en uso</h3>
                    <ListadoTable
                        titulos={titulos}
                    />
                </Col>
                <Col md="6" style={{ border: "2px solid red", minHeight: "200px" }} >
                    <h3 style={{ textAlign: "center" }}>Boletas en uso</h3>
                    <ListadoTable
                        titulos={titulos}
                    />
                </Col>
            </Row>
        </>
    )
}

export default ListaChqBol