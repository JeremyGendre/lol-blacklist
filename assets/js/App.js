import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button, Container, Dropdown, Form, Grid, Icon, Input, Message, Modal, Popup} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../css/app.css';
import BlacklistedPlayersList from "./Component/BlacklistedPlayersList";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SubmitButton from "./Component/SubmitButton";
import BlacklistedPlayersFound from "./Component/BlacklistedPlayersFound";
import CreatePlayer from "./Component/CreatePlayer";


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
    /** Snackbar **/
    const [snackbar, setSnackbar] = useState(null);

    /** Values **/
    const [simpleValue, setSimpleValue] = useState('');
    const [largeValue, setLargeValue] = useState('');

    /** Submit **/
    const [simpleSubmit, setSimpleSubmit] = useState(false);
    const [largeSubmit, setLargeSubmit] = useState(false);
    const [isListLoading,setIsListLoading] = useState(false);

    /** Lists **/
    const [blacklistedPlayers,setBlacklistedPlayers] = useState([]);
    const [blacklistedPlayersFound,setBlacklistedPlayersFound] = useState([]);
    const [reasonsList,setReasonsList] = useState([]);

    function handleSimpleSearchSubmit(){
        if(simpleValue !== ''){
            setSimpleSubmit(true);
            axios.post('/api/player/search/simple',{name:simpleValue}).then(data => {
                if(data.data.success === true){
                    setBlacklistedPlayersFound(data.data.content);
                }else{
                    console.error(data.data.message);
                    setSnackbar({text:data.data.message,type:'error'});
                }
                setSimpleSubmit(false);
            }).catch(e => {
                console.error(e);
                setSimpleSubmit(false);
                setBlacklistedPlayersFound([]);
            });
        }else{
            setSimpleSubmit(false);
            setBlacklistedPlayersFound([]);
        }
    }

    function handleLargeSearchSubmit(){
        if(largeValue !== ''){
            setLargeSubmit(true);
            axios.post('/api/player/search/wide',{content:largeValue}).then(data => {
                if(data.data.success === true){
                    setBlacklistedPlayersFound(data.data.content);
                }else{
                    console.error(data.data.message);
                    setSnackbar({text:data.data.message,type:'error'});
                }
                setLargeSubmit(false);
            }).catch(e => {
                console.error(e);
                setLargeSubmit(false);
                setBlacklistedPlayersFound([]);
            });
        }else{
            setLargeSubmit(false);
            setBlacklistedPlayersFound([]);
        }
    }

    function handleDeletedPlayer(playerToDelete){
        let newList = [];
        let newListFound = [];
        blacklistedPlayers.forEach(player=>{
            if(player.id !== playerToDelete){
                newList.push(player);
            }
        });
        blacklistedPlayersFound.forEach(player=>{
            if(player.id !== playerToDelete){
                newListFound.push(player);
            }
        });
        setBlacklistedPlayers(newList);
        setBlacklistedPlayersFound(newListFound);
    }

    function handleCloseSnackbar(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(null);
    }

    function handleNewPlayer(player){
        setBlacklistedPlayersFound([]);
        setBlacklistedPlayers(blacklistedPlayers.concat(player));
        setSnackbar({
            type : 'success',
            text : 'Player successfully registered'
        });
    }

    function handleSearchValuesChange(value,type = 'simple'){
        (type === 'simple') ? setSimpleValue(value) : setLargeValue(value);
        if(value === ''){
            setBlacklistedPlayersFound([]);
        }
    }

    function handleSetSnackBar(value){
        setSnackbar(value);
    }

    function handleLargeInputClick(event){
        if(event.target.tagName !== 'INPUT'){
            let childInputElement = event.target.querySelectorAll('input')[0];
            childInputElement.focus();
        }
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
                    <Grid.Column className="text-center" mobile={16} tablet={8} computer={8}>
                        <Form onSubmit={handleSimpleSearchSubmit} className='text-center'>
                            <div className="search-input-container" onClick={(e)=>handleLargeInputClick(e)}>
                                <Input transparent inverted
                                       icon='search'
                                       required
                                       size="large"
                                       disabled={simpleSubmit}
                                       defaultValue={simpleValue}
                                       onChange={(e,{value}) => handleSearchValuesChange(value,'simple')}
                                       style={{margin:'1em'}}
                                       placeholder='Search...' />
                            </div>
                            <SubmitButton loading={simpleSubmit} style={{marginLeft:'2em'}}/>
                        </Form>
                    </Grid.Column>
                    <Grid.Column className="text-center" mobile={16} tablet={8} computer={8}>
                        <Form onSubmit={handleLargeSearchSubmit}>
                            <div className="search-input-container" onClick={(e)=>handleLargeInputClick(e)}>
                                <Input transparent inverted
                                       icon='search'
                                       required
                                       size="large"
                                       disabled={largeSubmit}
                                       defaultValue={largeValue}
                                       onChange={(e,{value}) => handleSearchValuesChange(value,'wide')}
                                       style={{margin:'1em'}}
                                       placeholder='Extended search...' />
                            </div>
                            <SubmitButton loading={largeSubmit} style={{marginLeft:'2em'}}/>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <BlacklistedPlayersFound
                        playersFound={blacklistedPlayersFound}
                        handleDeletedPlayer={handleDeletedPlayer}
                        handleSetSnackBar={handleSetSnackBar}
                        handleCloseSnackbar={handleCloseSnackbar}/>
                </Grid.Row>
                <Grid.Row verticalAlign='middle' columns={2}>
                    <Grid.Column className="stats">
                        {blacklistedPlayers.length} players registered
                    </Grid.Column>
                    <Grid.Column>
                        <CreatePlayer handleNewPlayer={handleNewPlayer} reasonsList={reasonsList}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <BlacklistedPlayersList
                            playersList={blacklistedPlayers}
                            loading={isListLoading}
                            handleDeletedPlayer={handleDeletedPlayer}
                            handleSetSnackBar={handleSetSnackBar}
                            handleCloseSnackbar={handleCloseSnackbar}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            {snackbar !== null && (
                <Snackbar open={true} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
                        {snackbar.text}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('app')
);
