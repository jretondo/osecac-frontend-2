import React from 'react';
import { Col, FormGroup, Input, Label, Row } from 'reactstrap';

const HeaderIngresoTransf = () => {

    return (
        <Row>
            <Col md="4">
                <FormGroup>
                    <Label>Desde:</Label>
                    <Input type="date" />
                </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label>Hasta:</Label>
                    <Input type="date" />
                </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                    <Label for="exampleSelect">Filtro:</Label>
                    <Input type="select" name="select" id="exampleSelect">
                        <option value={null}>Todas</option>
                        <option value={0}>Actas</option>
                        <option value={1}>Legales</option>
                        <option value={2}>Bonos</option>
                    </Input>
                </FormGroup>
            </Col>
        </Row>
    )
}

export default HeaderIngresoTransf