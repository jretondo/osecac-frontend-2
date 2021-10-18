import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import formatMoney from 'Function/NumberFormat'
import ModalTypeList from './modalTypeList'
import moment from 'moment'
import UrlNodeServer from '../../../../../../api/NodeServer'
import axios from 'axios'

const FilaMovSin = ({
    id,
    item,
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
    setEsperar
}) => {

    const [modal, setModal] = useState(false)

    const AsignarTipo = async () => {
        setModal(true)
    }

    const ChangeTypeMov = async () => {
        const datos = {
            set: {
                conciliado: 1
            }
        }
        setEsperar(true)
        await axios.patch(`${UrlNodeServer.conciliacionDir.conciliacion}/${item.id}`, datos, {
            headers:
                { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
        })
            .then(res => {
                setEsperar(false)
                const respuesta = res.data
                const status = parseInt(respuesta.status)
                if (status === 200) {
                    setActividadStr("El usuario ha marcado como contabilizado el movimiento de ID: " + item.id)
                    setNvaActCall(nvaActCall)
                    setMsgStrong("Contabilizado correctamente! ")
                    setMsgGralAlert("")
                    setSuccessAlert(true)
                    setAlertar(!alertar)
                    setCall(!call)
                } else {
                    setMsgStrong("No se pudo contabilizar la transferencia ")
                    setMsgGralAlert("")
                    setSuccessAlert(false)
                    setAlertar(!alertar)
                }
            })
            .catch((error) => {
                console.error(error);
                setMsgStrong("No se pudo contabilizar la transferencia ")
                setMsgGralAlert("")
                setSuccessAlert(false)
                setAlertar(!alertar)
            })
    }

    return (
        <>
            <tr key={id}>
                <td style={{ textAlign: "center" }}>
                    {moment(item.fecha).format("DD/MM/YYYY")}
                </td>
                <td style={{ textAlign: "left" }}>
                    {
                        item.descripcion === "" ? item.concepto : `Cred Transf ${item.descripcion}`
                    }
                </td>
                <td style={parseInt(item.monto) > 0 ? { textAlign: "right", color: "green", fontWeight: "bold" } : { textAlign: "right", color: "red", fontWeight: "bold" }}>
                    $ {formatMoney(item.monto)}
                </td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault();
                                    ChangeTypeMov();
                                }}
                            >
                                <i className="fas fa-check"></i>
                                Contabilizar
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault();
                                }}
                            >
                                <i className="fas fa-eye"></i>
                                Agregar Observación
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault();
                                }}
                            >
                                <i className="fas fa-search"></i>
                                Ver Detalles
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr >
            <ModalTypeList
                modal={modal}
                setModal={setModal}
                idMov={item.id}
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
            />
        </>
    )
}

export default FilaMovSin