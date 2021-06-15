import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tab } from 'semantic-ui-react'
import PollMyCard from './PollMyCard'

export class Home extends Component {
    render() {
        const { userQuestionData } = this.props

        return <Tab panes={panes({ userQuestionData })} className="tab" />
    }
}

const panes = props => {
    const { userQuestionData } = props
    return [
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.answered.map(question => (
                        <PollMyCard
                            key={question.id}
                            question_id={question.id}
                            unanswered={true}
                        />
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.unanswered.map(question => (
                        <PollMyCard
                            key={question.id}
                            question_id={question.id}
                            unanswered={false}
                        />
                    ))}
                </Tab.Pane>
            )
        }
    ]
}

function mapStateToProps({ myAuthedUser, users, myQuestions }) {
    const answeredIds = Object.keys(users[myAuthedUser].answers)
    const answered = Object.values(myQuestions)
        .filter(question => !answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)
    const unanswered = Object.values(myQuestions)
        .filter(question => answeredIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    return {
        userQuestionData: {
            answered,
            unanswered
        }
    }
}

export default connect(mapStateToProps)(Home)