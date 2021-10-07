import React, { useState } from 'react'
import { Col, Row, Tooltip } from 'reactstrap'

const ButtonToggle = ({
    symbol,
    textToDo,
    toogle,
    setToggle
}) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    return (
        <Row>
            <Col md="12" style={{ textAlign: "right" }}>
                <button
                    id="minim1"
                    className="btn btn-primary"
                    onClick={e => {
                        e.preventDefault();
                        setToggle(!toogle)
                    }}
                    style={{ width: "50px", margin: 0 }}>
                    {symbol}
                </button>
                <Tooltip placement="right" isOpen={tooltipOpen} target="minim1" toggle={() => setTooltipOpen(!tooltipOpen)}>
                    {textToDo}
                </Tooltip>
            </Col>
        </Row>
    )
}

export default ButtonToggle;