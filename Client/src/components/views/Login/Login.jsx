import { useForm } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { Card, Form, Button, Spinner, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import styles from './Login.module.css';

export const LogIn = ({ onSubmit, user, closeSession, login:  isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const pendulumRefs = useRef([]);
  const bulbRefs = useRef([]);
 
  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, paused: false });
  
    timeline
      .to(pendulumRefs.current[4], {
        rotation: 50,
        duration: 1.5,
        transformOrigin: "top center",
        ease: "power2.inOut"
      })
      .to(bulbRefs.current[4], { backgroundColor:"#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 })
      .to(pendulumRefs.current[4], { rotation: 0, duration: 1.5, ease: "power2.inOut" })
      .to(bulbRefs.current[4], { backgroundColor: "white", boxShadow: "none", duration: 0.2 }) 
      .to(bulbRefs.current[0], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 }) 
      .to(bulbRefs.current[0], { backgroundColor: "white", boxShadow: "none", duration: 0.2 }) 
      .to(bulbRefs.current[1], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 }) 
      .to(bulbRefs.current[1], { backgroundColor: "white", boxShadow: "none", duration: 0.2 })
      .to(bulbRefs.current[2], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 }) 
      .to(bulbRefs.current[2], { backgroundColor: "white", boxShadow: "none", duration: 0.2 })
  
      .to(pendulumRefs.current[3], { rotation: -70, duration: 1.5, transformOrigin: "top center", ease: "power2.inOut" })
      
      .to(bulbRefs.current[3], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 })
  
      .to(pendulumRefs.current[3], { rotation: 0, duration: 1.5, ease: "power2.inOut" })
      
      .to(bulbRefs.current[3], { backgroundColor: "white", boxShadow: "none", duration: 0.2 }) 
      .to(bulbRefs.current[2], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 })
      .to(bulbRefs.current[2], { backgroundColor: "white", boxShadow: "none", duration: 0.2 })
      .to(bulbRefs.current[1], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 }) 
      .to(bulbRefs.current[1], { backgroundColor: "white", boxShadow: "none", duration: 0.2 }) 
      .to(bulbRefs.current[0], { backgroundColor: "#ffecb2", boxShadow: "0 0 20px #ffecb2", duration: 0.2 })
      .to(bulbRefs.current[0], { backgroundColor: "white", boxShadow: "none", duration: 0.2 });
  
    return () => timeline.kill();
  }, []);
  
  if (user) {
    return (
      <Card className={styles.userCard}>
        <Image 
          className={styles.userPhoto} 
          src={user.photo} 
          alt={user.email}
          roundedCircle
        />
        <Card.Body>
          <div className={styles.userInfo}>
            <p className={styles.userEmail}>Email: {user.email}</p>
          </div>
          <Button 
            variant="danger"
            onClick={closeSession}
            disabled={isLoading}
            className="w-100 mt-3"
          >
            {isLoading ? (
              <Spinner animation="border" size="sm" />
            ) : 'Sign Out'}
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>Welcome to our store</h1>
      <div className={styles.pendulumContainer}>
        <div className={styles.pivotBar}></div>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              ref={el => pendulumRefs.current[index] = el}
              className={styles.pendulum}
            >
              <div className={styles.string}></div>
              <div
                ref={el => bulbRefs.current[index] = el}
                className={styles.bulb}
              ></div>
            </div>
          ))}
      </div>

      <Card className={styles.loginCard}>
        <Card.Body>
          <Form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="email"
                  placeholder=" "
                  id="email"
                  name="email"
                  isInvalid={!!errors.email}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Form.Group className={styles.formGroup}>
              <div className={styles.inputBox}>
                <Form.Control
                  type="password"
                  placeholder=" "
                  id="password"
                  name="password"
                  isInvalid={!!errors.password}
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </div>
            </Form.Group>

            <Button 
              type="submit"
              variant="danger"
              className="w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner animation="border" size="sm" />
              ) : 'Login'}
            </Button>
            <div className="forgot-password">
              <Link className={styles.signupText}to="/password-rest">Forgot your password? click here.</Link>
            </div>
            <div className="text-center">
              <Link className={styles.signupText} to="/signup">Don't have an account yet? click here.</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};