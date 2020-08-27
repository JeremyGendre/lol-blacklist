import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Input, Message, Modal, Popup} from "semantic-ui-react";
import axios from "axios";

const dummyReasons = [
    { key:0, value:0, text: 'Other'},
    { key:1, value:1, text: 'Int'},
    { key:2, value:2, text: 'Toxic'},
    { key:3, value:3, text: 'Afk'},
];

export default function CreatePlayer(props) {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [newPlayerName,setNewPlayerName] = useState('');
    const [newPlayerReasons,setNewPlayerReasons] = useState([]);
    const [newPlayerFormError,setNewPlayerFormError] = useState('');
    const [newPlayerFormSubmitting,setNewPlayerFormSubmitting] = useState(false);
    const [reasonsList,setReasonsList] = useState(dummyReasons);

    function clearModal(){
        setIsModalOpen(false);
        setNewPlayerFormError('');
        setNewPlayerName('');
        setNewPlayerReasons([]);
        setNewPlayerFormSubmitting(false);
    }

    function handleNewPlayerForm(){
        setNewPlayerFormError('');
        let formElement = document.getElementById('new-player-form');
        if(formElement.reportValidity() !== false && checkNewPlayerValues() === true){
            setNewPlayerFormSubmitting(true);
            axios.post('/api/player/new',{
                name: newPlayerName,
                reasons: newPlayerReasons
            }).then(data => {
                setNewPlayerFormSubmitting(false);
                if(data.data.success === true){
                    props.handleNewPlayer(data.data.content);
                    clearModal();
                }else{
                    console.error(data.data.message);
                    setNewPlayerFormError(data.data.message);
                }
            }).catch(e => {
                console.error(e);
                setNewPlayerFormSubmitting(false);
                setNewPlayerFormError("An error occurred, registration impossible.");
            });
        }else if(newPlayerReasons.length === 0){
            setNewPlayerFormError('All fields need to be filled');
        }
    }

    function checkNewPlayerValues(){
        return (newPlayerName !== undefined && newPlayerName !== ''
            && newPlayerReasons !== undefined && newPlayerReasons.length > 0)
    }

    useEffect(() => {
        axios.get('/api/reason/all').then(data => {
            if(data.data.success === true){
                setReasonsList(data.data.content);
            }
        });
    },[]);

    return (
        <div>
            <Popup
                trigger={<Button onClick={() => setIsModalOpen(true)} size="huge" circular basic color="orange" icon='add user'/>}
                content='Add a user to the blacklist'
                position='top right'
            />
            <Modal
                centered
                size='mini'
                open={isModalOpen}
                onClose={clearModal}
                style={{color:'rgba(0,0,0,.85)'}}
            >
                <Modal.Header>Add to blacklist</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        {newPlayerFormError !== '' ? (
                            <Message negative>
                                {newPlayerFormError}
                            </Message>
                        ) : (<></>)}
                        <Form id="new-player-form" onSubmit={(e) => { e.preventDefault();handleNewPlayerForm();}}>
                            <Form.Group>
                                <Form.Field className="full-width">
                                    <label>Player name</label>
                                    <Input className="full-width" minLength="3" required onChange={(e,{value})=>setNewPlayerName(value)} placeholder="Name ..." />
                                </Form.Field>
                            </Form.Group>
                            <Form.Group>
                                <Form.Field className="full-width">
                                    <label>Reason of the blacklist</label>
                                    <Dropdown
                                        className="full-width"
                                        placeholder='Select one or many reasons'
                                        onChange={(e, {value})=>setNewPlayerReasons(value)}
                                        multiple selection search required options={reasonsList} />
                                </Form.Field>
                            </Form.Group>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={clearModal}>Cancel</Button>
                    <Button positive
                            loading={newPlayerFormSubmitting}
                            disabled={newPlayerFormSubmitting}
                            onClick={handleNewPlayerForm}>Submit</Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}

