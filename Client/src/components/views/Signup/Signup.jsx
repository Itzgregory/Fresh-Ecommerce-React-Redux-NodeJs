import { useForm } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import styles from './Signup.module.css'

export function SignUp({ onBack, onSubmit, onRegister, register: isLoading }) {
    const { 
        register, 
        handleSubmit, 
        formState: { errors },
        watch 
    } = useForm({
        mode: 'onBlur'  
    });
    const pendulumRefs = useRef([]);
    const bulbRefs = useRef([]);
    const password = watch('password', '');

    useEffect(() => {
        const timeline = gsap.timeline({ repeat: -1, paused: false });
      
        timeline
          .to(pendulumRefs.current[4], {
            rotation: 30,
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
      
          .to(pendulumRefs.current[3], { rotation: -30, duration: 1.5, transformOrigin: "top center", ease: "power2.inOut" })
          
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
      
    return (
        <div className={styles.registerContainer}>
            <div className="text-center mb-4">
                <h2 className={styles.title}>Welcome to our store</h2>
                <p className={styles.subTitle}>Fill out the following form and be part of our community!</p>
            </div>
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
            <Card className={styles.registerCard}>
                <Card.Body>
                    <Form onSubmit={handleSubmit(onRegister)} id="formSign"className={styles.registerForm}>
                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder=" "
                                    {...register("name", { 
                                        required: "Name is required",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Name should only contain letters"
                                        }
                                    })}
                                    isInvalid={!!errors.name}
                                />
                                <Form.Label htmlFor="name">Name</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.name?.message}
                                </Form.Control.Feedback>
                            </div> 
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="text"
                                    id="surname"
                                    name="surname"
                                    placeholder=" "
                                    {...register("surname", { 
                                        required: "Surname is required",
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message: "Surname should only contain letters"
                                        }
                                    })}
                                    isInvalid={!!errors.surname}
                                />
                                <Form.Label htmlFor="surname">Surname</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.surname?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="email"
                                    id="name"
                                    placeholder=" "
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Please enter a valid email address"
                                        }
                                    })}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder=" "
                                    {...register("phone", { 
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^\+?[\d\s-]+$/,
                                            message: "Please enter a valid phone number"
                                        }
                                    })}
                                    isInvalid={!!errors.phone}
                                />
                                <Form.Label htmlFor="phone">Phone</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.phone?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="text"
                                    id="username"
                                    placeholder=" "
                                    name="username"
                                    {...register("username", { 
                                        required: "Username is required",
                                        minLength: {
                                            value: 3,
                                            message: "Username must be at least 3 characters"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]+$/,
                                            message: "Username can only contain letters, numbers, and underscores"
                                        }
                                    })}
                                    isInvalid={!!errors.username}
                                />
                                <Form.Label htmlFor="username">Username</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.username?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="password"
                                    id="password"
                                    placeholder=" "
                                    name="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
                                        }
                                    })}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.password?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <div className={styles.inputBox}>
                                <Form.Control
                                    type="password"
                                    id="cpassword"
                                    name="cpassword"
                                    placeholder=" "
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => 
                                            value === password || "Passwords do not match"
                                    })}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Label htmlFor="cpassword">Confirm Password</Form.Label>
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3">
                           <div>
                                <Form.Label htmlFor="pImage">Profile Photo</Form.Label>
                                <Form.Control
                                    type="file"
                                    id="pImage"
                                    placeholder=" "
                                    name='pImage'
                                    accept="image/jpeg,image/png,image/gif"
                                    {...register("photo", {
                                        validate: {
                                            fileSize: files => 
                                                !files[0] || files[0].size <= 5000000 || 
                                                "File size must be less than 5MB",
                                            fileType: files =>
                                                !files[0] || 
                                                ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type) ||
                                                "File must be JPEG, PNG, or GIF"
                                        }
                                    })}
                                    isInvalid={!!errors.photo}
                                />
                                <Form.Text className="text-muted">
                                    Maximum file size: 5MB. Supported formats: JPEG, PNG, GIF
                                </Form.Text>
                                <Form.Control.Feedback type="invalid">
                                    {errors.photo?.message}
                                </Form.Control.Feedback>
                            </div>
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button 
                                type="submit" 
                                variant="danger" 
                                className="w-100 mb-3"
                                disabled={isLoading}
                            >
                                 {isLoading ? (
                                    <Spinner animation="border" size="sm" />
                                ) : 'SignUp'}
                            </Button>
                            <div className="text-center">
                                <Link className={styles.signupText} to="/login">Already have an account yet? click here.</Link>
                            </div>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}