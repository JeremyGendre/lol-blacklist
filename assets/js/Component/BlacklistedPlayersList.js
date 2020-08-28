import React, {useState} from 'react';
import axios from 'axios';
import {Button, Confirm, Dimmer, Icon, Loader, Modal, Popup, Table} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersList.css';
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import DeletePlayer from "./DeletePlayer";

export default function BlacklistedPlayersList(props) {

    if(typeof props.handleDeletedPlayer !== 'function'){
        props.handleDeletedPlayer = () => {}
    }

    function handleSetSnackBar(value){
        props.handleSetSnackBar(value);
    }

    function handleDeletedPlayer(playerToDelete){
        props.handleDeletedPlayer(playerToDelete);
    }

    function handleCloseSnackbar(event, reason){
        props.handleCloseSnackbar(event,reason);
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
                                        <DeletePlayer
                                            player={player}
                                            handleCloseSnackbar={handleCloseSnackbar}
                                            handleDeletedPlayer={handleDeletedPlayer}
                                            handleSetSnackBar={handleSetSnackBar}/>
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
        </div>
    );
}

