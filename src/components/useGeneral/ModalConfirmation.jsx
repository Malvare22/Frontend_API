import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input } from 'reactstrap';

export default function ModalConfirmation(props){

    return <Modal isOpen={props.viewAlert} centered={true}>
                <ModalBody className='d-flex justify-content-center align-content-center p-4'>
                    <h6 className='m-0 p-0'>¿Está seguro de guardar los cambios?</h6>
                </ModalBody>

                <ModalFooter className='d-flex justify-content-center'>
                    <Button color="primary" style={{ marginRight: "40px" }} onClick={props.updateProfile} >Aceptar</Button>
                    <Button color="secondary" style={{ marginLeft: "40px" }} onClick={props.toggleAlert}>Cancelar</Button>
                </ModalFooter>
    </Modal>
}




