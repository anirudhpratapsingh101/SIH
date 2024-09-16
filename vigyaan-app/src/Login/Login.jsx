import styles from './Login.module.css';
import { useState } from 'react';
// import axios from 'axios';

function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload on form submit
        try {
            const res = await axios.post('http://localhost:3001/login',{
                name,
                password,
            });
             if(res.data>=200 && res.data<300){
                    return(<>   
                            <p>HIII</p>
                    </>)
             }
             else{
                alert("Error, Username or Password is incorrect.");
             }
            console.log(res.data); // Handle the response here
        } catch (error) {
            console.error('Error logging in', error);
        }
    }
    // async function handleSubmitGoogle(event) {
       
    // }

    return (
        <div className={styles.login}>
           
            <p className={styles.loginText}>Login</p>
            <p className={styles.labelText}>Enter Username</p>
            <input 
                type="text" 
                className={styles.inputBar} 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
            />
            <p className={styles.labelText}>Enter Password</p>
            <input 
                type="password" 
                className={styles.inputBar} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />
            <br />
            <button className={styles.loginButton} onClick={handleSubmit}>Login</button> 
            <button className={styles.loginButtonGoogle} onClick={handleSubmit}>Login with Google</button> 
   
            <div className={styles.signUpDiv}>
                <p className={styles.signUp}>Don't have an account?</p>
                <button className={styles.signUpButton}>Register</button>
            </div>
        </div>
    );
}

export default Login;
