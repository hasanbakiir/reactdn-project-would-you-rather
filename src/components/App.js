import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { handleInitialData } from '../actions/shared'
import Login from './Login'
import Home from './Home'
import PollMyQuestion from './PollMyQuestion'
import Nav from './Nav'
import MyNewQuestion from './MyNewQuestion'
import LeaderBoard from './LeaderBoard'
import Page404 from './Page404'

class App extends Component {
  componentDidMount() {
    this.props.handleInitialData()
  }

  render() {
    const { myAuthedUser } = this.props
    return (
      <Router>
        <div>
          {myAuthedUser === null ?
            (<Route render={() => (
              <ContentGrid>
                <Login />
              </ContentGrid>
            )}
            />
            ) :
            (
              <Fragment>
                <Nav />
                <ContentGrid>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/add' component={MyNewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path="/myQuestions/bad_id" component={Page404} />
                    <Route path='/question/:question_id' component={PollMyQuestion} />
                    <Route component={Page404} />
                  </Switch>
                </ContentGrid>
              </Fragment>
            )}
        </div>
      </Router>
    )
  }
}

const ContentGrid = ({ children }) => (
  <Grid padded="vertically" columns={1} centered>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
    </Grid.Row>
  </Grid>
)

function mapStateToProps({ myAuthedUser }) {
  return {
    myAuthedUser
  }
}

export default connect(mapStateToProps, { handleInitialData })(App)
