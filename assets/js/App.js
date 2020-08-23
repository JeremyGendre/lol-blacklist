import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button, Container, Form, Grid, Icon, Input, Popup, TextArea} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../css/app.css';
import BlacklistedPlayersList from "./Component/BlacklistedPlayersList";

const dummyPlayers = [
    {
        name: 'sardoche',
        reasons: [
            'intentionnal feeding',
            'Toxic',
        ],
        createdAt: Date.now()
    },
    {
        name:'narkus',
        reasons: [
            'Toxic'
        ],
        createdAt: Date.now()
    },
];

function App() {
    const [simpleValue, setSimpleValue] = useState('');
    const [largeValue, setLargeValue] = useState('');
    const [simpleSubmit, setSimpleSubmit] = useState(false);
    const [largeSubmit, setLargeSubmit] = useState(false);

    function handleSimpleSearchSubmit(){
        setSimpleSubmit(true);
        console.log('simple search');
    }

    function handleLargeSearchSubmit(){
        setLargeSubmit(true);
        console.log('large search');
    }

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
                        Total : X players registered
                    </Grid.Column>
                    <Grid.Column>
                        <Popup
                            trigger={<Button size="huge" circular basic color="orange" icon='add user'/>}
                            content='Add a user to the blacklist'
                            position='top right'
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered>
                    <Grid.Column>
                        <BlacklistedPlayersList playersList={dummyPlayers}/>
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
