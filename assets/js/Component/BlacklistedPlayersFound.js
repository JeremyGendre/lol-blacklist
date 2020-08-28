import React from 'react';
import {Card, List} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersFound.css';

export default function BlacklistedPlayersFound(props) {
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
                                {player.name}<span><Icon/></span>
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

