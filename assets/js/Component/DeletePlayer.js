import React, {useState} from 'react';
import {Button, Icon, Modal, Popup} from "semantic-ui-react";
import axios from "axios";

export default function DeletePlayer(props) {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isDeleting,setIsDeleting] = useState(false);
    const [playerToDelete,setPlayerToDelete] = useState(null);

    function deletePlayer(){
        setIsDeleting(true);
        axios.delete('/api/player/delete/'+playerToDelete).then(data=>{
            if(data.data.success === true){
                props.handleSetSnackBar({type : 'success', text : data.data.content});
                props.handleDeletedPlayer(playerToDelete);
            }else{
                props.handleSetSnackBar({type : 'error', text : data.data.message});
            }
            clearModal();
        }).catch(error=>{
            console.error(error);
            clearModal();
            props.handleSetSnackBar({type : 'error', text : 'An error occurred, player impossible to delete'});
        });
    }

    function clearModal(){
        setIsDeleting(false);
        setIsModalOpen(false);
        setPlayerToDelete(null);
    }

    return (
        <>
            <Popup
                trigger={<Icon onClick={() => {setIsModalOpen(true); setPlayerToDelete(props.player.id);}} className='icon-delete' name="trash"/>}
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
                        Are you sure to delete this player ?
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={clearModal}>No</Button>
                    <Button positive loading={isDeleting} disabled={isDeleting} onClick={deletePlayer}>Yes</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}

