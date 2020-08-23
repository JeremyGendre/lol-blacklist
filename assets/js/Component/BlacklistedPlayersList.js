import React, {useState} from 'react';
import {Button, Icon, Modal, Popup, Table} from "semantic-ui-react";
import '../../css/Component/BlacklistedPlayersList.css';

export default function BlacklistedPlayersList(props) {
    const [playersList,setPlayerList] = useState(props.playersList);
    const [isModalOpen,setIsModalOpen] = useState(false);

    const actions = (
        <>
            <Popup
                trigger={<Icon onClick={() => setIsModalOpen(true)} className='icon-delete' size="large" name="delete"/>}
                content='Remove this player from the blacklist'
                inverted
                position='left center'
            />
            <Modal
                centered
                size='mini'
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
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
                    <Button negative onClick={() => setIsModalOpen(false)}>No</Button>
                    <Button positive onClick={() => setIsModalOpen(false)}>Yes</Button>
                </Modal.Actions>
            </Modal>
        </>
    );

    return (
        <Table selectable striped>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Reasons</Table.HeaderCell>
                    <Table.HeaderCell>Created at</Table.HeaderCell>
                    <Table.HeaderCell/>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {playersList.map((player, index) => {
                    return (
                        <Table.Row key={index}>
                            <Table.Cell>{player.name}</Table.Cell>
                            <Table.Cell>{player.reasons.map((reason,index)=><div key={index}>{reason}</div>)}</Table.Cell>
                            <Table.Cell>{player.createdAt}</Table.Cell>
                            <Table.Cell collapsing>{actions}</Table.Cell>
                        </Table.Row>
                    );
                })}
            </Table.Body>
        </Table>
    );
}

