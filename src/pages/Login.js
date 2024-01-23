import React,{useContext, useRef,useState} from 'react';
import {Container,Button} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import classes from './Login.module.css';
import AuthContext from '.././store/auth-context';
const Login=()=>{
    const emailRef=useRef();
    const passwordRef=useRef();
    const authCtx=useContext(AuthContext);
    const history=useHistory();
    const [isLoading,setIsLoading]=useState(false);
    
    async function submitHandler(e){
        e.preventDefault();
        const enteredEmail=emailRef.current.value;
        const enteredPassword=passwordRef.current.value;
        setIsLoading(true);
        const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if(response.ok){
            console.log('Signup Successful');
            const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
                method:'POST',
                body:JSON.stringify({
                    email:enteredEmail,
                    password:enteredPassword,
                    returnSecureToken:true
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            });
            setIsLoading(false);
            if(response.ok){
                const data=await response.json();
                authCtx.login(data.idToken);
                localStorage.setItem(enteredEmail,data.idToken);
                history.push('/products');
                emailRef.current.value='';
                passwordRef.current.value='';
            }else{
                const data=await response.json();
                let errorMsg='Authentication failed';
                if(data&&data.error&&data.error.message){
                    errorMsg=data.error.message;
                }
                alert(errorMsg);
                setIsLoading(false);
            }
        }else{
            const data=await response.json();
            let errorMsg='Authentication failed';
            if(data&&data.error&&data.error.message){
                errorMsg=data.error.message;
            }
            if(errorMsg==='EMAIL_EXISTS'){
                const response=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjrVEwwfFJ1ESLh8hh7JY0pHnojJnymZU',{
                    method:'POST',
                    body:JSON.stringify({
                        email:enteredEmail,
                        password:enteredPassword,
                        returnSecureToken:true
                    }),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                });
                setIsLoading(false);
                if(response.ok){
                    const data=await response.json();
                    authCtx.login(data.idToken);
                    localStorage.setItem(enteredEmail,data.idToken);
                    history.push('/products');
                    emailRef.current.value='';
                    passwordRef.current.value='';
                }else{
                    const data=await response.json();
                    let errorMsg='Authentication failed';
                    if(data&&data.error&&data.error.message){
                        errorMsg=data.error.message;
                    }
                    alert(errorMsg);
                    setIsLoading(false);
                }
            }else{
                alert(errorMsg);
                setIsLoading(false);
            }
        }
    }
    return(
       <>
        <Header/>
        <h2 className={classes.divTitle}>LOGIN</h2>
        <Container className={classes.form}>
            <form onSubmit={submitHandler}>
                <label htmlFor='email' className={classes.labels}>Email ID</label>
                <input className={classes.inputField} id='email' type='email' ref={emailRef}/>
                <label htmlFor='password' className={classes.labels}>Password</label>
                <input className={classes.inputField} id='password' type='password' ref={passwordRef}/>
                {isLoading?<p className={classes.loadingText}>Logging you in...</p>:<Button variant="light" className={classes.submitbtn} type='submit'>SUBMIT</Button>}
            </form>
        </Container>
        <Footer/>
       </>
    )
}
export default Login;