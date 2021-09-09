import React from 'react'
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle
} from "reactstrap"
import swal from 'sweetalert'
import axios from 'axios'
import UrlNodeServer from '../../../../api/NodeServer'
const FilaProducto = ({
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
    setEsperar,
    primero,
    pagina,
    setPagina
}) => {

    const EliminarMov = (e, id, detalle) => {
        e.preventDefault()
        swal({
            title: "Eliminar Movimiento!",
            text: "¿Está seguro de eliminar el movimiento: " + detalle + " ? Esta operación no se puede revertir.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    setEsperar(true)
                    await axios.delete(UrlNodeServer.removeExtracto + id, {
                        headers:
                            { 'Authorization': 'Bearer ' + localStorage.getItem('user-token') }
                    })
                        .then(() => {
                            if (primero) {
                                if (pagina > 1) {
                                    setPagina(parseInt(pagina - 1))
                                }
                            }
                            setActividadStr("El usuario ha eliminado el movimiento " + detalle)
                            setNvaActCall(!nvaActCall)
                            setMsgStrong("Extracto eliminado con éxito!")
                            setMsgGralAlert("")
                            setSuccessAlert(true)
                            setAlertar(!alertar)
                            setCall(!call)
                            setEsperar(false)
                        })
                        .catch(() => {
                            setMsgStrong("Hubo un error al querer eliminar el Extracto")
                            setMsgGralAlert("")
                            setSuccessAlert(false)
                            setAlertar(!alertar)
                            setEsperar(false)
                        })
                }
            });
    }

    const DiferenciaMov = async (id) => {
    }

    return (
        <tr key={id}>
            <td style={{ textAlign: "center", fontWeight: "bold" }}>
                {item.fecha}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.comprobante}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.descripcion}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.monto}
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
                                e.preventDefault()
                                DiferenciaMov(item.id)
                            }}
                        >
                            <i className="fas fa-search"></i>
                            Diferencia
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => EliminarMov(e, item.id, item.descripcion)}
                        >
                            <i className="fas fa-trash"></i>
                            Eliminar Movimiento
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr >
    )
}

export default FilaProducto