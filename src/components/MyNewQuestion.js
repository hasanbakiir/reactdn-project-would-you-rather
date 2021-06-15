import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Segment,
    Header,
    Grid,
    Divider,
    Form,
    Dimmer,
    Loader
} from 'semantic-ui-react'
import { handleSaveQuestion } from '../actions/myQuestions'

export class MyNewQuestion extends Component {
    state = {
        validSubmit: false,
        isLoading: false,
        option1: '',
        option2: ''
    }
    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleSubmit = e => {
        e.preventDefault()
        const { myAuthedUser, handleSaveQuestion } = this.props
        const { option1, option2 } = this.state

        new Promise((res, rej) => {
            this.setState({ isLoading: true })
            handleSaveQuestion(option1, option2, myAuthedUser)
            setTimeout(() => res('success'), 1000)
        }).then(() => {
            this.setState({
                option1: '',
                option2: ''
            })
            this.setState({ validSubmit: true })
        })
    }
    render() {
        const disabled = this.state.option1 === '' || this.state.option2 === ''

        if (this.state.validSubmit === true) {
            return <Redirect to="/" />
        }
        return (
            <Segment.Group>
                <Header as="h3" textAlign="center" block attached="top">
                    Ask New Question
        </Header>
                <Grid padded>
                    <Grid.Column>
                        {this.state.isLoading && (
                            <Dimmer active inverted>
                                <Loader content="Updating" />
                            </Dimmer>
                        )}
                        <p>Complete the question:</p>
                        <p>
                            <strong>Would you rather...</strong>
                        </p>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                id="option1"
                                placeholder="Option one..."
                                value={this.state.option1}
                                onChange={this.handleChange}
                                required
                            />
                            <Divider horizontal>Or</Divider>

                            <Form.Input
                                id="option2"
                                placeholder="Option two..."
                                value={this.state.option2}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Button color="teal" size="tiny" fluid disabled={disabled}>
                                Submit Here
                            </Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment.Group>
        )
    }
}

function mapStateToProps({ myAuthedUser }) {
    return {
        myAuthedUser
    }
}

export default connect(
    mapStateToProps,
    { handleSaveQuestion }
)(MyNewQuestion)