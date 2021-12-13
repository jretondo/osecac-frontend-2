import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1';
import React, { useState } from 'react'
import {
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import ListaChqBol from './listaChqBol'

const ChqBol = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    nvaActCall,
    setNvaActCall,
    setActividadStr,
    alertar,
    setAlertar
}) => {
    const [windowToggle, setWindowToggle] = useState(false)

    if (windowToggle) {
        return (
            <Card className="shadow" style={{ marginTop: "35px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Chequeras y Boletas (talonarios)</h2>
                </CardHeader>
                <CardBody>
                    <ListaChqBol
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        setActividadStr={setActividadStr}
                        alertar={alertar}
                        setAlertar={setAlertar}
                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" style={{ marginTop: "35px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Chequeras y Boletas (talonarios)</h2>
                </CardHeader>
            </Card>)
    }
}

export default ChqBol