import React, { useState } from 'react'
import {
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap'

const opPos = ["Acreditado de más", "Acreditado de menos"]
const opNeg = ["Débitado de más", "Débitado de menos"]

const ModalDiference = ({
    impOriginal,
    modal,
    setModal,
    idMov
}) => {

    const [impNvo, setImpNvo] = useState(0)
    const [dif, setDif] = useState(0)
    const [textDif, setTextoDif] = useState("Diferencia")

    const chageNewValue = (e) => {
        setImpNvo(e.target.value)
        let impO
        let impN
        if (impOriginal >= 0) {
            impO = impOriginal
            impN = e.target.value
        } else {
            impO = (-impOriginal)
            impN = e.target.value
        }

        if (impOriginal >= 0) {
            if (impO > impN) {
                setTextoDif(opPos[0])
            } else {
                setTextoDif(opPos[1])
            }
        } else {
            if (impO > impN) {
                setTextoDif(opNeg[0])
            } else {
                setTextoDif(opNeg[1])
            }
        }

        try {
            setDif(
                (Math.round((impO - impN) * 100) / 100)
            )
        } catch (error) {

        }
    }

    return (
        <div>
            <Modal isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}><h2 style={{ textAlign: "center" }}>Diferencia de Importe</h2></ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="examplePassword">Importe Extracto {impOriginal >= 0 ? "(Crédito)" : "(Débito)"}:</Label>
                            <Input style={impOriginal >= 0 ? { background: "#cbffcb", color: "black" } : { background: "#ff7c7c", color: "white" }} type="number" value={impOriginal >= 0 ? impOriginal : (-impOriginal)} disabled />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">Importe Real:</Label>
                            <Input type="number" value={impNvo >= 0 ? impNvo : (-impNvo)} placeholder="Importe del libro banco..." onChange={e => chageNewValue(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="examplePassword">{textDif}:</Label>
                            <Input type="number" style={
                                impOriginal > 0 ?
                                    dif >= 0 ?
                                        { background: "#cbffcb", color: "black" } :
                                        { background: "#ff7c7c", color: "white" }
                                    :
                                    dif >= 0 ?
                                        { background: "#ff7c7c", color: "white" } :
                                        { background: "#cbffcb", color: "black" }
                            } value={dif >= 0 ? dif : (-dif)} disabled />
                            <span>{
                                impOriginal > 0 ?
                                    dif >= 0 ?
                                        "*La diferencia de le restará a los gastos" :
                                        "*La diferencia de le sumará a los gatos"
                                    :
                                    dif >= 0 ?
                                        "*La diferencia de le sumará a los gastos" :
                                        "*La diferencia de le restará a los gatos"
                            }</span>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Row>
                        <Col md="6">
                            <button className="btn btn-primary">
                                Aplicar
                            </button>
                        </Col>
                        <Col md="6">
                            <button
                                className="btn btn-danger"
                                onClick={e => {
                                    e.preventDefault()
                                    setModal(false)
                                }}
                            >
                                Cancelar
                            </button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalDiference