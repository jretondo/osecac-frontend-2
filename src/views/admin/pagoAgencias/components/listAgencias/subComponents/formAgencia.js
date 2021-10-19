import React from 'react'
import { CardBody, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

const FormAgencia = ({
    detallesBool,
    idDetalle,
    setDetallesBool,
    setIdDetalle,
    setCall,
    call
}) => {

    return (
        <CardBody>
            <Form>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label for="agenciaTxt">Agencia</Label>
                            <Input type="text" id="agenciaTxt" placeholder="Ingrese la agencia..." />
                        </FormGroup>
                    </Col>
                    <Col md="4">
                        <FormGroup>
                            <Label for="localidadTxt">Localidad</Label>
                            <Input type="text" id="localidadTxt" placeholder="Ingrese la localidad..." />
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </CardBody>
    )
}

export default FormAgencia