import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Image, Form, Loader, Dimmer } 
    from 'semantic-ui-react'
import { setMyAuthedUser } from '../actions/myAuthedUser'

class Login extends Component {
    state = {
        loading: false
    }

    handleLoading = () => {
        this.setState(() => ({
            loading: true
        }))
    }

    render() {
        return (
            <Fragment>
                <Segment.Group>
                    <LoginHeader />
                    <LoginGridLayout
                        image={<BrandImage />}
                        form={<ConnectedLoginForm onLoading={this.handleLoading} />}
                        loading={this.state.loading}
                    />
                </Segment.Group>
            </Fragment>
        )
    }
}

const LoginHeader = () => (
    <Header as="h3" block attached="top" textAlign="center">
        <Header.Content>This is Would You Rather App!</Header.Content>
        <Header.Subheader>To continue Sign in Please </Header.Subheader>
    </Header>
)

const LoginGridLayout = ({ image, form, loading }) => (
    <div>
        <Grid padded textAlign="center">
            <Grid.Row className="login">
                <Grid.Column width={16}>
                    {loading === true && (
                        <Dimmer active inverted>
                            <Loader inverted content="Loading" />
                        </Dimmer>
                    )}
                    {image}
                    <br />
                    {form}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

const BrandImage = () => (
    <Image src="/img/reactred.jpg" size="medium" centered />
)

class LoginForm extends Component {
    state = {
        value: ''
    }
    onChange = (e, { value }) => {
        this.setState({ value })
    }
    handleSubmit = e => {
        e.preventDefault()
        const { onLoading, setMyAuthedUser } = this.props
        const myAuthedUser = this.state.value

        new Promise((res, rej) => {
            onLoading()
            setTimeout(() => res(), 500)
        }).then(() => setMyAuthedUser(myAuthedUser))
    }
    generateDropdownData = () => {
        const { users } = this.props

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }))
    }
    render() {
        const { value } = this.state
        const disabled = value === '' ? true : false

        return (
            <Form onSubmit={this.handleSubmit}>
                <Header as="h2" color="teal">
                    Sign in
            </Header>

                <Form.Dropdown
                    placeholder="Select a Friend"
                    fluid
                    selection
                    scrolling
                    options={this.generateDropdownData()}
                    value={value}
                    onChange={this.onChange}
                    required
                />
                <Form.Button content="Login" color="teal" disabled={disabled} fluid />
            </Form>
        )
    }
}


const ConnectedLoginForm = connect(
    mapStateToProps,
    { setMyAuthedUser }
)(LoginForm)

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}

export default Login