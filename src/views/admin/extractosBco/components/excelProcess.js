import React, { useState, useMemo, useEffect } from "react"
import {
    Row,
    Spinner,
    Col
} from "reactstrap"
import { useDropzone } from 'react-dropzone'
import UrlNodeServer from '../../../../api/NodeServer'
import ExcelPNG from 'assets/img/brand/excel.png'

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

const ExcelProcessForm = ({
    setMsgStrong,
    setMsgGralAlert,
    setSuccessAlert,
    setAlertar,
    alertar
}) => {
    const [loading, setLoading] = useState(false)
    const [excelSelect, setExcelSelect] = useState(false)
    const [fileName, setFileNAme] = useState("")
    const [archivo, setArchivo] = useState("")

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

    useEffect(() => {
        // eslint-disable-next-line
        acceptedFiles.map(file => {
            setArchivo(file)
            setFileNAme(file.name)
            setExcelSelect(true)
        })
    }, [acceptedFiles])

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
        const formData = new FormData();
        setLoading(true)
        formData.append(fileName, archivo);
        await fetch(UrlNodeServer.procesarExrtactos, {
            method: 'POST',
            body: formData,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(response => response.json())
            .then(() => {
                setLoading(false)
                setExcelSelect(false)
                setArchivo("")
                setFileNAme("")
                setMsgStrong("Excel procesado éxitosamente! ")
                setMsgGralAlert("Ya puede descargar el extracto débidamente formateado.")
                setSuccessAlert(true)
                setAlertar(!alertar)
            })
            .catch(() => {
                setLoading(false)
                setMsgStrong("Hubo un error al querer procesar el Extracto")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    if (excelSelect) {
        return (
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
        )
    } else if (loading) {
        return (
            <>
                <div style={{ textAlign: "center", marginTop: "100px" }}>
                    <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} /> </div>
            </>
        )
    } else {
        return (
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
        )
    }
}

export default ExcelProcessForm