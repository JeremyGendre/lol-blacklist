import React, {useState} from 'react';
import axios from 'axios';
import {Button, Confirm, Dimmer, Icon, Loader, Modal, Popup, Table} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersList.css';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function BlacklistedPlayersList(props) {
    const [snackbar, setSnackbar] = useState(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isDeleting,setIsDeleting] = useState(false);
    const [playerToDelete,setPlayerToDelete] = useState(null);
    if(typeof props.handleDeletedPlayer !== 'function'){
        props.handleDeletedPlayer = () => {}
    }

    function deletePlayer(){
        setIsDeleting(true);
        axios.delete('/api/player/delete/'+playerToDelete).then(data=>{
            if(data.data.success === true){
                setSnackbar({type : 'success', text : data.data.content});
                props.handleDeletedPlayer(playerToDelete);
            }else{
                setSnackbar({type : 'error', text : data.data.message});
            }
            clearModal();
        }).catch(error=>{
            console.error(error);
            clearModal();
            setSnackbar({type : 'error', text : 'An error occurred, player impossible to delete'});
        });
    }

    function clearModal(){
        setIsDeleting(false);
        setIsModalOpen(false);
        setPlayerToDelete(null);
    }

    function handleCloseSnackbar(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(null);
    }

    return (
        <div>
            <Dimmer active={props.loading}>
                <Loader>Loading</Loader>
            </Dimmer>
            <Table selectable style={{borderTop:'solid orange'}} inverted>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Reasons</Table.HeaderCell>
                        <Table.HeaderCell>Created at</Table.HeaderCell>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                {props.playersList.length > 0 ? (
                    <Table.Body>
                        {props.playersList.map((player, index) => {
                            return (
                                <Table.Row key={index} id={'row-player-'+player.id}>
                                    <Table.Cell>{player.id}</Table.Cell>
                                    <Table.Cell>{player.name}</Table.Cell>
                                    <Table.Cell>{player.reasons.map((reason,index)=><div key={index}>{reason}</div>)}</Table.Cell>
                                    <Table.Cell>{player.createdAt}</Table.Cell>
                                    <Table.Cell collapsing>
                                        <Popup
                                            trigger={<Icon onClick={() => {setIsModalOpen(true); setPlayerToDelete(player.id);}} className='icon-delete' name="trash"/>}
                                            content='Remove this player from the blacklist'
                                            position='left center'
                                        />
                                        <Modal
                                            centered
                                            size='mini'
                                            open={isModalOpen}
                                            onClose={clearModal}
                                            onOpen={() => setIsModalOpen(true)}
                                            style={{color:'rgba(0,0,0,.85)'}}
                                        >
                                            <Modal.Header>Remove this player</Modal.Header>
                                            <Modal.Content>
                                                <Modal.Description>
                                                    Are you sure to remove this player from the list ?
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button negative onClick={clearModal}>No</Button>
                                                <Button positive loading={isDeleting} disabled={isDeleting} onClick={deletePlayer}>Yes</Button>
                                            </Modal.Actions>
                                        </Modal>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                ) : (
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell colSpan='5' className="text-center">No Result</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                )}
            </Table>
            {snackbar !== null && (
                <Snackbar open={true} autoHideDuration={1500} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbar.type}>
                        {snackbar.text}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

