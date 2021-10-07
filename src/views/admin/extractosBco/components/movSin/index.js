import ButtonToggle from 'components/subComponents/buttonToggle/buttonToggle1'
import React, { useState } from 'react'
import { Card, CardHeader } from 'reactstrap'

const MovSinIdentificar = () => {
    const [windowToggle, setWindowToggle] = useState(false)

    return (
        <>
            <Card className="shadow">
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
                    <h2 className="mb-0" style={{ textAlign: "center" }}>Moviemientos sin identificar</h2>
                </CardHeader>

            </Card>
        </>
    )
}

export default MovSinIdentificar