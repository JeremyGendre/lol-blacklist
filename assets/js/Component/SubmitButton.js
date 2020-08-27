import React from 'react';
import {Button, Icon} from "semantic-ui-react";

export default function SubmitButton(props) {
    return (
        <Button animated basic inverted loading={props.loading} style={props.style}>
            <Button.Content visible>Submit</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
        </Button>
    );
}

