import UrlNodeServer from '../../../../../api/NodeServer'
import axios from 'axios'
import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useState, useEffect } from 'react'
import { Card, CardHeader } from 'reactstrap'
import CardBody from 'reactstrap/lib/CardBody'
import HeaderIngresoTransf from './header'

const MovSinIdentificar = ({
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
    setDetBool
}) => {
    const [windowToggle, setWindowToggle] = useState(false)

    useEffect(() => {
        MovSin()
        // eslint-disable-next-line
    }, [])

    const MovSin = async () => {
        await axios.get(`${UrlNodeServer.conciliacionDir.sub.transferencias}`, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                const data = res.data.body
                if (parseInt(data.length) > 0) {
                    setMsgStrong("Hay movimientos sin asignar tipo de movieminto! ")
                    setMsgGralAlert("Revise y asignele un tipo.")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
    }

    if (windowToggle) {
        return (
            <Card className="shadow" style={{ marginTop: "15px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Ingresos de Transferencias</h2>
                </CardHeader>
                <CardBody>
                    <HeaderIngresoTransf

                    />
                </CardBody>
            </Card>
        )
    } else {
        return (
            <Card className="shadow" style={{ marginTop: "15px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={windowToggle ? "-" : "+"}
                        textToDo={windowToggle ? "Minimizar" : "Maximizar"}
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Ingresos de Transferencias</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default MovSinIdentificar