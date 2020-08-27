import React from 'react';
import {Card} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersFound.css';

export default function BlacklistedPlayersFound(props) {
    return (
        <Card.Group centered className={props.playersFound.length > 0 ? 'result-players-found' : ''}>
            {props.playersFound.length > 0 ? (
                <div className='d-block text-center full-width'>{props.playersFound.length} players found</div>
            ) : (<></>)}
            {props.playersFound.map(player => {
                return (
                    <Card>
                        <Card.Content>
                            <Card.Header>{player.name}</Card.Header>
                            <Card.Meta>{player.createdAt}</Card.Meta>
                            <Card.Description>
                                {player.reasons.map(reason => <div>{reason}</div>)}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                );
            })}
        </Card.Group>
    );
}

