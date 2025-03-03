import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import sadKawaii from '../../../assets/images/sadkawaii.gif';

export const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5">
      <h1>Oops! Error 404 - Page Not Found</h1>
      <div>
        <img src={sadKawaii} alt="Sad Kawaii" style={{ width: '300px', height: 'auto' }} />
      </div>
      <p>The page you are looking for does not exist. If you need help, please contact an administrator.</p>
      <h3>Sorry!</h3>
      <Button onClick={() => navigate("/")} variant="success" className="mt-3">Back to Home</Button>
    </Container>
  );
};
