import React, {useState} from 'react';
import {Button, Form, Message, Modal, Popup, Table} from "semantic-ui-react";
import axios from "axios";

export default function ReasonForm(props) {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [newReasonFormError,setNewReasonFormError] = useState('');
    const [newReasonFormSubmitting,setNewReasonFormSubmitting] = useState(false);

    function handleNewReasonForm(){
        console.log('ouais');
    }

    function clearModal(){
        setIsModalOpen(false);
        setNewReasonFormError('');
        setNewReasonFormSubmitting(false);
    }

    return (
        <div>
            <Popup
                trigger={<Button onClick={() => setIsModalOpen(true)} size="huge" circular basic color="orange" icon='add'/>}
                content='Add a reason'
                position='top right'
            />
            <Modal
                centered
                size='mini'
                open={isModalOpen}
                onClose={clearModal}
                style={{color:'rgba(0,0,0,.85)'}}
            >
                <Modal.Header>New reason</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {newReasonFormError !== '' ? (
                            <Message negative>
                                {newReasonFormError}
                            </Message>
                        ) : (<></>)}
                        <Form id="new-reason-form" onSubmit={(e) => { e.preventDefault();handleNewReasonForm();}}>
                            test
                        </Form>
                        <Table selectable>
                            <Table.Body>
                                {props.reasonsList.map((reason,index) => {
                                    console.log(reason);
                                    return (
                                        <Table.Row key={index}>
                                            {reason.label}
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={clearModal}>Cancel</Button>
                    <Button positive
                            loading={newReasonFormSubmitting}
                            disabled={newReasonFormSubmitting}
                            onClick={handleNewReasonForm}>Submit</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

