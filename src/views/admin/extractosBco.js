import React, { useEffect, useState, useMemo } from "react";
import { UseActivity } from '../../Hooks/UseActivity'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import { useDropzone } from 'react-dropzone'
// reactstrap components
import {
    Card,
    CardHeader,
    CardFooter,
    Container,
    Row,
    Spinner,
    Col,
    Input,
    Form,
    FormGroup,
    Label
} from "reactstrap"
// core components
import Header from "components/Headers/Header.js";
import UrlNodeServer from '../../api/NodeServer'
import FilaExtractos from '../../components/subComponents/Listados/SubComponentes/FilaExtractos'
import ListadoTable from '../../components/subComponents/Listados/ListadoTable'
import AlertaForm from '../../components/subComponents/alerts/Alerta1'
import ExcelPNG from 'assets/img/brand/excel.png'
import Paginacion from '../../components/subComponents/Paginacion/Paginacion'
import FileSaver from 'file-saver';
import { UseSecureRoutes } from '../../Hooks/UseSecureRoutes'
import { headerAtorizarion } from '../../api/headerToken'

const titulos = ["Fecha", "Saldo Inicial", "Mov. del Día", "Saldo Final", ""]
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    height: "150px"
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const ProductsItems = () => {
    const [alertar, setAlertar] = useState(false)
    const [msgStrongAlert, setMsgStrong] = useState("")
    const [msgGralAlert, setMsgGralAlert] = useState("")
    const [successAlert, setSuccessAlert] = useState(false)
    const [esperar2, setEsperar2] = useState(false)
    const [espera3, setEsperar3] = useState(false)
    const [listado, setListado] = useState(<></>)
    const [excelSelect, setExcelSelect] = useState(false)
    const [archivo, setArchivo] = useState("")
    const [fileName, setFileNAme] = useState("")
    const [desde, setDesde] = useState("")
    const [hasta, setHasta] = useState("")
    const [pagina, setPagina] = useState(1)
    const [plantPaginas, setPlantPaginas] = useState([])
    const [ultimaPag, setUltimaPag] = useState(0)
    const [pages, setPages] = useState([])
    const [call2, setCall2] = useState(false)
    const [filtro, setFiltro] = useState(false)
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

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
        ListarExtractos()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (filtro) {
            ListarExtractos()
            setPagina(1)
        }
        // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        ListarExtractos()
        // eslint-disable-next-line
    }, [pagina])

    useEffect(() => {
        ListarExtractos()
        setPagina(1)
        // eslint-disable-next-line
    }, [call2])

    useEffect(() => {
        // eslint-disable-next-line
        acceptedFiles.map(file => {
            setArchivo(file)
            setFileNAme(file.name)
            setExcelSelect(true)
        })
    }, [acceptedFiles])

    useEffect(() => {
        setFiltro(false)
    }, [desde, hasta])

    function StyledDropzone(props) {
        return (
            <div className="container" style={{ marginBottom: "10px" }}>
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} onChange={e => {
                        setArchivo(e.target.files[0])
                        setFileNAme(e.target.files[0].name)
                        setExcelSelect(true)
                    }} />
                    <p style={{ marginTop: "40px" }}>Arrastre aquí el Excel provisto por el banco</p>
                </div>
            </div>
        );
    }

    const ProcesarExtracto = async (e) => {
        e.preventDefault()
        setEsperar3(true)
        const formData = new FormData();

        formData.append(fileName, archivo);
        await fetch(UrlNodeServer.ProcesarExtracto, {
            method: 'PUT',
            body: formData,
            headerAtorizarion
        })
            .then(response => response.json())
            .then(() => {
                setEsperar3(false)
                setExcelSelect(false)
                setArchivo("")
                setFileNAme("")
                setMsgStrong("Excel procesado éxitosamente! ")
                setMsgGralAlert("Ya puede descargar el extracto débidamente formateado.")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch(() => {
                setMsgStrong("Hubo un error al querer procesar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
                setEsperar2(false)
            })
    }

    const ListarExtractos = async () => {
        let query = ""
        if (filtro) {
            query = `?desde=${desde}&hasta=${hasta}`
        }
        setEsperar2(true)
        await axios.get(UrlNodeServer.extractoslist + pagina + query, headerAtorizarion)
            .then(res => {
                setEsperar2(false)
                const data = res.data.body
                if (parseInt(data.pages.cantTotal) > 0) {
                    setUltimaPag(data.pages.totalPag)
                    setPages(data.pages)
                    setListado(
                        data.listado.map((item, key) => {
                            let primero
                            if (key === 0) {
                                primero = true
                            } else {
                                primero = false
                            }
                            return (
                                <FilaExtractos
                                    id={key}
                                    key={key}
                                    item={item}
                                    setActividadStr={setActividadStr}
                                    nvaActCall={nvaActCall}
                                    setNvaActCall={setNvaActCall}
                                    alertar={alertar}
                                    setAlertar={setAlertar}
                                    setMsgStrong={setMsgStrong}
                                    setMsgGralAlert={setMsgGralAlert}
                                    setSuccessAlert={setSuccessAlert}
                                    setCall={setCall2}
                                    call={call2}
                                    setEsperar={setEsperar2}
                                    primero={primero}
                                    pagina={pagina}
                                    setPagina={setPagina}
                                />
                            )
                        })
                    )
                } else {
                    setEsperar2(false)
                    setListado(
                        <tr style={{ textAlign: "center", width: "100%" }}>
                            <td>
                                No hay extractos cargados
                            </td>
                        </tr>
                    )
                }
            })
            .catch(() => {
                setEsperar2(false)
                setListado(
                    <tr style={{ textAlign: "center", width: "100%" }}>
                        <td>
                            No hay extractos cargados
                        </td>
                    </tr>
                )
            })
    }

    const ConsultaFechas = (e) => {
        e.preventDefault()
        setFiltro(true)
    }

    const DescargarPDF = async (e) => {
        e.preventDefault()
        let error = false

        if (desde === "") {
            error = true
        } else {
            if (!hasta === "") {
                error = true
            }
        }

        if (error) {
            setMsgStrong("Controle las fechas del filtro! ")
            setMsgGralAlert("Hay un error en las fechas, verifique que esten las dos")
            setSuccessAlert(false)
            setAlertar(!alertar)
        } else {
            setEsperar2(true)
            await axios.get(UrlNodeServer.extractosDownload + `?desde=${desde}&hasta=${hasta}`, {
                responseType: 'arraybuffer',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                    Accept: 'application/pdf',
                }
            })
                .then(res => {
                    FileSaver.saveAs(
                        new Blob([res.data], { type: 'application/pdf' })
                    );

                    setEsperar2(false)
                    setMsgStrong("Extracto descargado con éxito! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                })
                .catch(() => {
                    setMsgStrong("Hubo un error al querer descargar el Extracto")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                    setEsperar2(false)
                })
        }
    }

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
                                        esperar2 ?
                                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div> :
                                            <>
                                                <CardHeader className="border-0">
                                                    <h2 className="mb-0" style={{ textAlign: "center" }}>Extractos Banco de Córdoba</h2>
                                                    <Form onSubmit={e => ConsultaFechas(e)}>
                                                        <Row form style={{ textAlign: "left" }}>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <Label for="exampleEmail">Desde:{" "}</Label>
                                                                    <Input type="date" name="desde" required value={desde} onChange={e => { setDesde(e.target.value) }} max={hasta} />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={3}>
                                                                <FormGroup>
                                                                    <Label for="exampleEmail">Hasta:{" "}</Label>
                                                                    <Input type="date" name="hasta" required value={hasta} onChange={e => { setHasta(e.target.value) }} min={desde} />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="6">
                                                                <Row>
                                                                    <Col >
                                                                        <button className="btn btn-primary" style={{ marginTop: "33px" }} type="submit">Filtrar</button>
                                                                        <button className="btn btn-warning" style={{ marginTop: "33px" }} onClick={e => DescargarPDF(e)}>
                                                                            Descargar PDF
                                                                        </button>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Form>
                                                </CardHeader>
                                                <ListadoTable
                                                    listado={listado}
                                                    titulos={titulos}
                                                />
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
                                            </>
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: "30px" }}>
                            <Col>
                                <Card className="shadow">
                                    <CardHeader className="border-0">
                                        <h2 className="mb-0" style={{ textAlign: "center" }}>Importar Excel de Bancon</h2>
                                    </CardHeader>
                                    {
                                        espera3 ?
                                            <div style={{ textAlign: "center", marginTop: "100px" }}>
                                                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div> :
                                            <>
                                                {
                                                    excelSelect ?
                                                        <>
                                                            <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                                                                <Col md="12" style={{ textAlign: "center" }}>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={e => {
                                                                            setExcelSelect(false)
                                                                            setArchivo("")
                                                                            setFileNAme("")
                                                                        }}
                                                                        style={{ position: "relative", right: "-120px", top: "-40px" }}
                                                                    > X
                                                                    </button>
                                                                    <img src={ExcelPNG} style={{ width: "80px" }} alt="Excel" />
                                                                    <h3 style={{ color: "green" }}>{fileName}</h3>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12" style={{ textAlign: "center" }}>
                                                                    <button className="btn btn-warning" style={{ marginBottom: "30px" }} onClick={e => { ProcesarExtracto(e) }} >Procesar Archivo</button>
                                                                </Col>
                                                            </Row>
                                                        </>
                                                        :
                                                        <>
                                                            <StyledDropzone />
                                                            <Row>
                                                                <Col md="12" style={{ textAlign: "center", marginBottom: "30px" }}>
                                                                    <h3>O</h3>
                                                                    <button className="btn btn-primary" style={{ margin: 0 }} onClick={e => {
                                                                        e.preventDefault()
                                                                        document.getElementById("selectFile").click()

                                                                    }} >Elija un Archivo</button>
                                                                    <br />
                                                                    <input type="file" placeholder="Selecciones archivo" id="selectFile" style={{ visibility: "hidden" }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={e => {
                                                                        setArchivo(e.target.files[0])
                                                                        setFileNAme(e.target.files[0].name)
                                                                        setExcelSelect(true)
                                                                    }} />
                                                                </Col>
                                                            </Row>
                                                        </>
                                                }
                                            </>
                                    }
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
