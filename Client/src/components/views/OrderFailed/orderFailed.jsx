import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export function OrderFail() {

  const navigate = useNavigate()
    return (
      <Container>
        <Container fluid >
          <div>
            <h1>¡Ouch! an error was ocurred!</h1>
            <div>
              <img src={require('../../../assets/images/sadkawaii.gif')} alt="thanks" />
            </div>
            <p>An error occurred during your transaction. Please contact an administrator</p>
            <h3>すみません</h3>
          </div>
          <div>
            <Button onClick={(() => navigate("/"))} variant="success">Back to main</Button>
          </div>
        </Container>
      </Container>
    )
  }
  
