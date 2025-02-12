import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import './EndBuy.css'

export function EndBuy() {
  const navigate = useNavigate()
  return (
    <Container>
      <Container fluid >
        <div>
          <h1>Thank you choose us!</h1>
          <div >
            <img src={require('../../../assets/images/thanks.gif')} alt="thanks" id="finalImg" />
          </div>
          <p id='finalMessage'>Your purchase receipt will be sent to your mailbox!</p>
          <h3>どうもありがとう!</h3>
        </div>
        <div>
          <Button onClick={(() => navigate("/"))} variant="success">Back to main</Button>
        </div>
      </Container>
    </Container>
  )
}

