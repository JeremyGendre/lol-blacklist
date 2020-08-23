import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Button, Container, Form, Grid, Icon, Input, TextArea} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import '../css/app.css';


function App() {
    const [simpleValue, setSimpleValue] = useState('');
    const [largeValue, setLargeValue] = useState('');

    function handleSimpleSearchSubmit(){
        console.log('simple search');
    }

    function handleLargeSearchSubmit(){
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
                                   defaultValue={largeValue}
                                   onChange={(e) => setLargeValue(e.currentTarget.value)}
                                   style={{padding:'1em',borderBottom:'solid 1px lightgrey'}}
                                   placeholder='Extended search...' />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Button basic inverted color="olive" animated>
                        <Button.Content visible>Add</Button.Content>
                        <Button.Content hidden>
                            <Icon name='add'/>
                        </Button.Content>
                    </Button>
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
