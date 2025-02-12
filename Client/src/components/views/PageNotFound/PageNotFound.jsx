
import { Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
    const navigate = useNavigate()
    return (
      <Container>
        <Container fluid >
          <div>
            <h1>¡Ouch! Error 404 - Page not found!!!</h1>
            <div>
              <img src={require('../../../assets/images/sadkawaii.gif')} alt="thanks" />
            </div>
            <p>The site you are trying to access does not exist. If you have any doubt, please contact an administrator</p>
            <h3>すみません</h3>
          </div>
          <div>
            <Button onClick={(() => navigate("/"))} variant="success">Back to main</Button>
          </div>
        </Container>
      </Container>
    )
  
}

