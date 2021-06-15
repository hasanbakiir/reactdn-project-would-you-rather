import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Segment, Header, Grid, Image
} from 'semantic-ui-react'
import MyPoll from './MyPoll'
import Result from './Result'
import { handleSaveQuestionAnswer } from '../actions/users'
import { Redirect } from 'react-router-dom'

class PollMyQuestion extends Component {
    state = {
        value: ''
    }

    handleChange = (e, { value }) => this.setState({ value })

    handleSubmit = e => {
        e.preventDefault()
        if (this.state.value !== '') {
            const { myAuthedUser, question, handleSaveQuestionAnswer } = this.props
            handleSaveQuestionAnswer(myAuthedUser, question.id, this.state.value)
        }
    }

    render() {
        const { question, author, badPath, unanswered } = this.props
        const disabled = this.state.value === '' ? true : false

        if (badPath === true) {
            return <Redirect to="/myQuestions/bad_id" />
        }

        return (
            <Segment.Group>
                <Header as="h4"
                    textAlign="left"
                    block
                    attached="top"
                >
                    {author.name} asks:
                </Header>
                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={author.avatarURL} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            {unanswered ? (
                                <MyPoll
                                    handleChange={this.handleChange}
                                    handleSubmit={this.handleSubmit}
                                    question={question}
                                    disabled={disabled}
                                    value={this.state.value}
                                />
                            ) : (
                                    <Result question={question} />
                                )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        )
    }
}

function mapStateToProps(
    { users, myQuestions, myAuthedUser },
    { match, question_id }
) {
    let question,
        author,
        unanswered = true,
        badPath = false
    if (question_id !== undefined) {
        question = myQuestions[question_id]
        author = users[question.author]
        if (question_id in users) {
            unanswered = false
        }
    } else {
        const { question_id } = match.params
        question = myQuestions[question_id]

        if (question === undefined) {
            badPath = true
        } else {
            author = users[question.author]
            if (question_id in users[myAuthedUser].answers) {
                unanswered = false
            }
        }
    }

    return {
        badPath,
        question,
        author,
        myAuthedUser,
        unanswered
    }
}

export default connect(
    mapStateToProps,
    { handleSaveQuestionAnswer }
)(PollMyQuestion)