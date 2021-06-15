import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
    Segment,
    Grid,
    Header,
    Image,
    Label,
    Divider
} from 'semantic-ui-react'

const trophyColor = ['yellow', 'orange', 'grey']

class LeaderBoard extends Component {
    render() {
        const { leaderBoardData } = this.props

        return (
            <Fragment>
                {leaderBoardData.map((user, idx) => (
                    <Segment.Group key={user.id}>
                        <Label corner="left" icon="trophy" color={trophyColor[idx]} />
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={4} verticalAlign="middle">
                                    <Image src={user.avatarURL} />
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as="h3" textAlign="left">
                                        {user.name}
                                    </Header>
                                    <Grid>
                                        <Grid.Column width={12}>Answered Questions</Grid.Column>
                                        <Grid.Column width={4}>{user.answerCount}</Grid.Column>
                                    </Grid>
                                    <Divider />
                                    <Grid>
                                        <Grid.Column width={12}>Created Questions</Grid.Column>
                                        <Grid.Column width={4}>{user.questionCount}</Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign="center">
                                    <Segment.Group>
                                        <Header as="h5" block attached="top" content="Score Pts" />
                                        <Segment>
                                            <Label circular color="green" size="big">
                                                {user.questionCount + user.answerCount}
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment.Group>
                ))}
            </Fragment>
        )
    }
}

function mapStateToProps({ users }) {
    const leaderBoardData = Object.values(users)
        .map(user => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answerCount: Object.values(user.answers).length,
            questionCount: user.myQuestions.length,
            total: Object.values(user.answers).length + user.myQuestions.length
        }))
        .sort((a, b) => a.total - b.total)
        .reverse()
        .slice(0, 3)
    return {
        leaderBoardData
    }
}

export default connect(mapStateToProps)(LeaderBoard)