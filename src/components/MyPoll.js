import React, { Component, Fragment } from 'react'
import {
    Header, Button, Form, Radio
} from 'semantic-ui-react'

class MyPoll extends Component {
    render() {
        const { question, disabled } = this.props
        return (
            <Fragment>
                <Header as="h4" textAlign="left">
                    Would you rather
                                </Header>
                <Form onSubmit={this.props.handleSubmit}>
                    <Form.Field>
                        <Radio
                            label={question.optionOne.text}
                            name="radioGroup"
                            value="optionOne"
                            checked={this.props.value === 'optionOne'}
                            onChange={this.props.handleChange}
                        />
                        <br />
                        <Radio
                            label={question.optionTwo.text}
                            name="radioGroup"
                            value="optionTwo"
                            checked={this.props.value === 'optionTwo'}
                            onChange={this.props.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Button
                            color="teal"
                            size="tiny"
                            fluid
                            basic
                            positive
                            disabled={disabled}
                            content="Submit"
                        />
                    </Form.Field>
                </Form>
            </Fragment>
        )
    }
}

export default MyPoll