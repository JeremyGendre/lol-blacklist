import React from 'react';
import {Card, List} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersFound.css';
import DeletePlayer from "./DeletePlayer";

export default function BlacklistedPlayersFound(props) {
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
        <Card.Group centered className={props.playersFound.length > 0 ? 'result-players-found' : ''}>
            {props.playersFound.length > 0 ? (
                <div className='d-block text-center full-width'>{props.playersFound.length} players found</div>
            ) : (<></>)}
            {props.playersFound.map((player,index) => {
                return (
                    <Card key={index} className='player-found-card'>
                        <Card.Content>
                            <Card.Header className='player-found-card-header'>
                                {player.name}
                                <span style={{float:'right'}}>
                                    <DeletePlayer
                                    player={player}
                                    handleCloseSnackbar={handleCloseSnackbar}
                                    handleDeletedPlayer={handleDeletedPlayer}
                                    handleSetSnackBar={handleSetSnackBar}/>
                                </span>
                            </Card.Header>
                            <Card.Meta className='player-found-card-meta'><small>{player.createdAt}</small></Card.Meta>
                            <Card.Description className='player-found-card-description'>
                                <List>
                                    {player.reasons.map((reason,rIndex) => (
                                        <List.Item key={rIndex}>
                                            <List.Icon name='dot circle'/>
                                            <List.Content>
                                                {reason}
                                            </List.Content>
                                        </List.Item>
                                    ))}
                                </List>
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
            })}
        </Card.Group>
    );
}

