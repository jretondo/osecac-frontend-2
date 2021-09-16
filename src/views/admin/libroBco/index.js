import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import FormsLibro from './components/forms'

const Index = () => {
    const [call, setCall] = useState(false)
    const [nvoMovBool, setNvoMovBool] = useState(true)
    const { loading, error } = UseSecureRoutes(
        UrlNodeServer.routesDir.sub.libroBanco,
        call
    )

    useEffect(() => {
        setCall(!call)
        // eslint-disable-next-line
    }, [])

    if (error) {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
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
                <Header />
                <Container className="mt--7" fluid>
                    <Card className="shadow">
                        <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                                <Col md="8" >
                                    {
                                        nvoMovBool ?
                                            <h3>Nuevo Movimiento en Libro Banco Córdoba</h3> :
                                            <h2 className="mb-0">Libro Banco</h2>
                                    }
                                </Col>
                                <Col md="4" style={{ textAlign: "right" }} >
                                    {
                                        nvoMovBool ?
                                            <button
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setNvoMovBool(false)
                                                }}
                                                className="btn btn-danger">
                                                X
                                            </button> :
                                            <button
                                                onClick={e => {
                                                    e.preventDefault()
                                                    setNvoMovBool(true)
                                                }}
                                                className="btn btn-primary">
                                                Nuevo Movimiento
                                            </button>
                                    }
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            {
                                nvoMovBool ?
                                    <FormsLibro

                                    />
                                    :
                                    null
                            }
                        </CardBody>
                    </Card>
                </Container>
            </>
        )
    }
}

export default Index;
