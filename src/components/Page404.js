import React, { Component } from 'react'
import { Container, Header } from 'semantic-ui-react'

export class Page404 extends Component {
  render() {
    return (
      <Container textAlign="center">
        <Header as="h3">404 Page Not Found!</Header>
        <p>The page you are looking for doesn't exist.</p>
      </Container>
    )
  }
}

export default Page404