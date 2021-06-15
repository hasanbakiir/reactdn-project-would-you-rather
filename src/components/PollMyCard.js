import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Segment, Header, Grid, Image, Button
} from 'semantic-ui-react'

export class PollMyCard extends Component {
    render() {
        const { question, question_id, unanswered, author } = this.props
        return (
            <Segment.Group>
                <Header as="h4"
                    textAlign="left"
                    block
                    attached="top"
                    style={unanswered ? { borderTop: '3px solid teal' } : { borderTop: '3px solid Green' }}
                >
                    {author.name} asks:
                </Header>
                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={author.avatarURL} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Fragment>
                                <Header as="h5" textAlign="left">
                                    Would you rather
                                </Header>
                                <p style={{ textAlign: 'left' }}>
                                    {question.optionOne.text}
                                    <br />
                                    or...
                                </p>
                                {unanswered ? (
                                    <Link to={`question/${question_id}`}>
                                        <Button
                                            color="teal"
                                            size="tiny"
                                            fluid
                                            basic
                                            style={{ borderRadius: "5px" }}
                                            content="View Poll"
                                            attached="bottom"
                                        />
                                    </Link>
                                ) :
                                    <Link to={`question/${question_id}`}>
                                        <Button
                                            color="green"
                                            size="tiny"
                                            fluid
                                            basic
                                            style={{ borderRadius: "5px" }}
                                            content="View Poll Result"
                                            attached="bottom"
                                        />
                                    </Link>}
                            </Fragment>
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
        badPath = false
    if (question_id !== undefined) {
        question = myQuestions[question_id]
        author = users[question.author]
    } else {
        const { question_id } = match.params
        question = myQuestions[question_id]

        if (question === undefined) {
            badPath = true
        } else {
            author = users[question.author]
        }
    }

    return {
        badPath,
        question,
        author
    }
}

export default connect(mapStateToProps)(PollMyCard)