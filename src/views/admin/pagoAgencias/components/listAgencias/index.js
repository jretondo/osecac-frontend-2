import React, { useState, useEffect } from 'react'
import {
    Card,
    CardHeader,
} from "reactstrap"
import ListaExtractosComp from './subComponents/listaMovimientos'
import FiltroComp from './subComponents/filtro'
import Row from 'reactstrap/lib/Row'
import Col from 'reactstrap/lib/Col'
import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'

const ListaExtractos = ({
    pagina,
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
    setUltimaPag,
    setPages,
    setPagina
}) => {

    const [filtro, setFiltro] = useState(false)
    const [filtroStr, setFiltroStr] = useState("")

    const [windowToggle, setWindowToggle] = useState(false)

    useEffect(() => {
        setFiltro(false)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (filtro) {
            setPagina(1)
        }
        // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        if (filtro) {
            setFiltro(false)
        }
        // eslint-disable-next-line 
    }, [filtroStr])
    if (windowToggle) {
        return (
            <>
                <Card className="shadow" style={{ marginTop: "30px" }}>
                    <CardHeader className="border-0">
                        <ButtonToggle
                            symbol={
                                windowToggle ? "-" : "+"
                            }
                            textToDo={
                                windowToggle ? "Minimizar" : "Maximizar"
                            }
                            toogle={windowToggle}
                            setToggle={setWindowToggle}
                        />
                        <h2 className="mb-0" style={{ textAlign: "center" }}>Agencias y dependencias</h2>
                    </CardHeader>
                    <ListaExtractosComp
                        pagina={pagina}
                        filtro={filtro}
                        setActividadStr={setActividadStr}
                        nvaActCall={nvaActCall}
                        setNvaActCall={setNvaActCall}
                        alertar={alertar}
                        setAlertar={setAlertar}
                        setMsgStrong={setMsgStrong}
                        setMsgGralAlert={setMsgGralAlert}
                        setSuccessAlert={setSuccessAlert}
                        setCall={setCall}
                        call={call}
                        setPagina={setPages}
                        setUltimaPag={setUltimaPag}
                        setPages={setPages}
                        filtroStr={filtroStr}
                    />
                </Card>
            </>
        )
    } else {
        return (

            <Card className="shadow" style={{ marginTop: "30px" }}>
                <CardHeader className="border-0">
                    <ButtonToggle
                        symbol={
                            windowToggle ? "-" : "+"
                        }
                        textToDo={
                            windowToggle ? "Minimizar" : "Maximizar"
                        }
                        toogle={windowToggle}
                        setToggle={setWindowToggle}
                    />
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Agencias y dependencias</h2>
                </CardHeader>
            </Card>
        )
    }
}

export default ListaExtractos