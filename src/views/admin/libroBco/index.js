import React, { useState, useEffect } from "react"
import UrlNodeServer from '../../../api/NodeServer'
import Header from "components/Headers/Header.js"
import {
    Spinner,
    Container
} from "reactstrap";
import { Redirect } from "react-router-dom"
import { UseSecureRoutes } from '../../../Hooks/UseSecureRoutes'
import FormsLibro from './components/forms/'
import ChqBolComp from './components/chqBol'

const Index = () => {
    const [call, setCall] = useState(false)
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

                    <FormsLibro />

                    <ChqBolComp />

                </Container>
            </>
        )
    }
}

export default Index;
