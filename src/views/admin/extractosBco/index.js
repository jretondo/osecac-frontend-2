import React, { useEffect, useState } from "react";
import { UseActivity } from '../../../Hooks/UseActivity'
import { Redirect } from "react-router-dom"
// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
    Spinner,
    Col
} from "reactstrap"
// core components
import Header from "components/Headers/Header.js";
import UrlNodeServer from '../../../api/NodeServer'
import AlertaForm from '../../../components/subComponents/alerts/Alerta1'
import Paginacion from '../../../components/subComponents/Paginacion/Paginacion'
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import ListaExtractos from './components/ListaExtractos'
import ExcelProcessComp from './components/excelProcess'

const ProductsItems = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [pagina, setPagina] = useState(1)
    const [plantPaginas, setPlantPaginas] = useState([])
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [call2, setCall2] = useState(false)
    const [filtro, setFiltro] = useState(false)

    const [detBool, setDetBool] = useState(false)
    const [idDet, setIdDet] = useState("")

    const [nvaActCall, setNvaActCall] = useState(false)
    const [actividadStr, setActividadStr] = useState("")
    UseActivity(
        nvaActCall,
        actividadStr
    )
    const [call, setCall] = useState(false)
    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.extractosbancarios,
        call
    )

    useEffect(() => {
        setFiltro(false)
        setCall(!call)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (filtro) {
            setPagina(1)
        }
        // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        // eslint-disable-next-line
    }, [pagina])

    useEffect(() => {
        setPagina(1)
        // eslint-disable-next-line
    }, [call2])

    useEffect(() => {
        setFiltro(false)
    }, [desde, hasta])

    if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    } else {
        return (
            <>
                <AlertaForm
                    success={successAlert}
                    msgStrong={msgStrongAlert}
                    msgGral={msgGralAlert}
                    alertar={alertar}
                />
                <Header />
                <Container className="mt--7" fluid>
                    <>
                        <Row>
                            <Col>
                                <Card className="shadow">
                                    {
                                        !detBool ?
                                            <>
                                                <ListaExtractos
                                                    desde={desde}
                                                    hasta={hasta}
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
                                                    setCall2={setCall2}
                                                    call2={call2}
                                                    setPagina={setPages}
                                                    setUltimaPag={setUltimaPag}
                                                    setPages={setPages}
                                                    setDesde={setDesde}
                                                    setHasta={setHasta}
                                                    setFiltro={setFiltro}
                                                    setDetBool={setDetBool}
                                                    setIdDet={setIdDet}
                                                />
                                            </> :
                                            null
                                    }
                                    <CardFooter className="py-4">
                                        <nav aria-label="..." style={{ marginBottom: "20px" }}>
                                            <Paginacion
                                                setPagina={(pagina) => setPagina(pagina)}
                                                pagina={pagina}
                                                plantPaginas={plantPaginas}
                                                ultimaPag={ultimaPag}
                                                pages={pages}
                                                setPlantPaginas={(plantPaginas) => setPlantPaginas(plantPaginas)}
                                                setUltimaPag={(ultimaPag) => setUltimaPag(ultimaPag)}
                                            />
                                        </nav>
                                    </CardFooter>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Importar Excel de Bancon</h2>
                                    </CardHeader>
                                    <ExcelProcessComp
                                        setMsgStrong={setMsgStrong}
                                        setMsgGralAlert={setMsgGralAlert}
                                        setSuccessAlert={setSuccessAlert}
                                        setAlertar={setAlertar}
                                        alertar={alertar}
                                        setCall2={setCall2}
                                        call2={call2}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </>
                </Container>
            </>
        )
    }
}

export default ProductsItems;
