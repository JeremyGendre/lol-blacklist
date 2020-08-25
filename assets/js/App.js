import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button, Container, Dropdown, Form, Grid, Input, Message, Modal, Popup} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../css/app.css';
import BlacklistedPlayersList from "./Component/BlacklistedPlayersList";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const dummyReasons = [
    { key:0, value:0, text: 'Other'},
    { key:1, value:1, text: 'Feed'},
    { key:2, value:2, text: 'Toxic'},
    { key:3, value:3, text: 'Afk'},
];

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
    /** Snackbar **/
    const [snackbar, setSnackbar] = useState(null);

    /** Common **/
    const [simpleValue, setSimpleValue] = useState('');
    const [largeValue, setLargeValue] = useState('');
    const [simpleSubmit, setSimpleSubmit] = useState(false);
    const [largeSubmit, setLargeSubmit] = useState(false);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isListLoading,setIsListLoading] = useState(false);
    const [blacklistedPlayers,setBlacklistedPlayers] = useState([]);
    const [reasonsList,setReasonsList] = useState(dummyReasons);

    /** New player States **/
    const [newPlayerName,setNewPlayerName] = useState('');
    const [newPlayerReasons,setNewPlayerReasons] = useState([]);
    const [newPlayerFormError,setNewPlayerFormError] = useState('');
    const [newPlayerFormSubmitting,setNewPlayerFormSubmitting] = useState(false);

    function handleSimpleSearchSubmit(){
        setSimpleSubmit(true);
        console.log('simple search');
    }

    function handleLargeSearchSubmit(){
        setLargeSubmit(true);
        console.log('large search');
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
                    setBlacklistedPlayers(blacklistedPlayers.concat(data.data.content));
                    setSnackbar({
                        type : 'success',
                        text : 'Player successfully registered'
                    });
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

    function clearModal(){
        setIsModalOpen(false);
        setNewPlayerFormError('');
        setNewPlayerName('');
        setNewPlayerReasons([]);
        setNewPlayerFormSubmitting(false);
    }

    function handleCloseSnackbar(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(null);
    }

    useEffect(()=>{
        setIsListLoading(true);
        axios.get('/api/player/all').then(data => {
            if(data.data.success === true){
                setBlacklistedPlayers(data.data.content);
                setIsListLoading(false);
            }
        });
        axios.get('/api/reason/all').then(data => {
            if(data.data.success === true){
                setReasonsList(data.data.content);
            }
        });
    },[]);

    return (
        <Container className="app-container">
            <Grid>
                <Grid.Row centered columns={2}>
                    <Grid.Column className="text-center">
                        <Form onSubmit={handleSimpleSearchSubmit}>
                            <Input transparent inverted
                                   icon='search'
                                   required
                                   size="large"
                                   loading={simpleSubmit}
                                   defaultValue={simpleValue}
                                   onChange={(e) => setSimpleValue(e.currentTarget.value)}
                                   style={{padding:'1em',borderBottom:'solid 1px lightgrey'}}
                                   placeholder='Search...' />
                        </Form>
                    </Grid.Column>
                    <Grid.Column className="text-center">
                        <Form onSubmit={handleLargeSearchSubmit}>
                            <Input transparent inverted
                                   icon='search'
                                   required
                                   size="large"
                                   loading={largeSubmit}
                                   defaultValue={largeValue}
                                   onChange={(e) => setLargeValue(e.currentTarget.value)}
                                   style={{padding:'1em',borderBottom:'solid 1px lightgrey'}}
                                   placeholder='Extended search...' />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row verticalAlign='middle' columns={2}>
                    <Grid.Column id="player-total">
                        {blacklistedPlayers.length} players registered
                    </Grid.Column>
                    <Grid.Column>
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
                            onOpen={() => setIsModalOpen(true)}
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
                                <Button positive loading={newPlayerFormSubmitting} onClick={handleNewPlayerForm}>Submit</Button>
                            </Modal.Actions>
                        </Modal>
                    </Grid.Column>
                </Grid.Row>
                {snackbar !== null && (
                    <Snackbar open={true} autoHideDuration={1500} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
                            {snackbar.text}
                        </Alert>
                    </Snackbar>
                )}
                <Grid.Row centered>
                    <Grid.Column>
                        <BlacklistedPlayersList playersList={blacklistedPlayers} loading={isListLoading}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('app')
);
