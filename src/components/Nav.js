import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Menu,
    Responsive,
    Image,
    Grid,
    Button,
    Container
} from 'semantic-ui-react'
import { setMyAuthedUser } from '../actions/myAuthedUser'

class Nav extends Component {
    handleLogout = e => {
        e.preventDefault()
        this.props.setMyAuthedUser(null)
    }

    render() {
        const { myAuthedUser, users } = this.props

        return (
            <Container>
                <Responsive as={Menu} minWidth={651} pointing>
                    <Menu.Item name="home" as={NavLink} to="/" exact />
                    <Menu.Item name="new question" as={NavLink} to="/add" />
                    <Menu.Item name="leader board" as={NavLink} to="/leaderboard" />
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <span>
                                <Image
                                    src={users[myAuthedUser].avatarURL}
                                    avatar
                                    spaced="right"
                                    verticalAlign="bottom"
                                />
                                {users[myAuthedUser].name}
                            </span>
                        </Menu.Item>
                        <Menu.Item>
                            <Button
                                content="Logout"
                                labelPosition="right"
                                basic
                                compact
                                icon="log out"
                                size="mini"
                                onClick={this.handleLogout}
                            />
                        </Menu.Item>
                    </Menu.Menu>
                </Responsive>
                <Responsive as={Fragment} minWidth={375} maxWidth={650}>
                    <Grid columns={2} padded="vertically">
                        <Grid.Row>
                            <Grid.Column>
                                <Image
                                    src={users[myAuthedUser].avatarURL}
                                    avatar
                                    spaced="right"
                                    verticalAlign="bottom"
                                />
                                {users[myAuthedUser].name}
                            </Grid.Column>
                            <Grid.Column verticalAlign="bottom" textAlign="right">
                                <Button
                                    content="Logout"
                                    labelPosition="right"
                                    basic
                                    compact
                                    icon="log out"
                                    size="mini"
                                    onClick={this.handleLogout}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={16}>
                                <Menu pointing widths={3}>
                                    <Menu.Item name="home" as={NavLink} to="/" exact />
                                    <Menu.Item name="new question" as={NavLink} to="/add" />
                                    <Menu.Item
                                        name="leader board"
                                        as={NavLink}
                                        to="/leaderboard"
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
                <Responsive as={Fragment} maxWidth={374}>
                    <Grid padded="vertically" columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Image
                                    src={users[myAuthedUser].avatarURL}
                                    avatar
                                    spaced="right"
                                    verticalAlign="bottom"
                                />
                                {users[myAuthedUser].name}
                                <Button
                                    content="Logout"
                                    labelPosition="right"
                                    basic
                                    compact
                                    icon="log out"
                                    size="mini"
                                    floated="right"
                                    onClick={this.handleLogout}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Menu pointing secondary widths={3}>
                                    <Menu.Item name="home" as={NavLink} to="/" exact />
                                    <Menu.Item name="new question" as={NavLink} to="/add" />
                                    <Menu.Item
                                        name="leader board"
                                        as={NavLink}
                                        to="/leaderboard"
                                    />
                                </Menu>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Responsive>
            </Container>
        )
    }
}

function mapStateToProps({ users, myAuthedUser }) {
    return {
        myAuthedUser,
        users
    }
}

export default connect(
    mapStateToProps,
    { setMyAuthedUser }
)(Nav)