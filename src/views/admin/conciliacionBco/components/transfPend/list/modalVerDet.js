import UrlNodeServer from '../../../../../../api/NodeServer';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Col,
    Form,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner
} from 'reactstrap';

const ModalVerDet = ({
    modal,
    setModal,
    idMov,
    setActividadStr,
    nvaActCall,
    setNvaActCall,
    alertar,
    setAlertar,
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setCall,
    call,
}) => {
    const [loading, setloading] = useState(false)
    const [plantTipos, setPlanttipos] = useState(<></>)

    useEffect(() => {

        // eslint-disable-next-line
    }, [])




    return (
        <Modal isOpen={modal} toggle={() => setModal(!modal)}>
            <Form onSubmit={e => e.preventDefault()}>
                {
                    loading ?
                        <>
                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
                        </> :
                        <>
                            <ModalHeader toggle={() => setModal(!modal)}>Asignar Tipo a movimiento</ModalHeader>
                            <ModalBody>
                                {plantTipos}
                            </ModalBody>
                            <ModalFooter>
                                <Row>
                                    <Col md="12">
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
                        </>
                }
            </Form>
        </Modal>
    )
}

export default ModalVerDet