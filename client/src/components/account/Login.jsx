import React, {useState,useContext} from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import {DataContext} from '../../context/DataProvider';
import {API} from '../../service/api';
import {useNavigate} from 'react-router-dom';

const Component = styled(Box)`
    width:400px;
    margin:auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;
const Image = styled('img')({
    width: 100,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const SignupButton = styled(Button)`
text-transform: none;
background: #fff;
color: #2874f0;
height: 48px;
border-radius: 2px;
box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;
const Text = styled(Typography)`
color: #878787;
font-size: 12px;
`;
const Error=styled(Typography)`
    font-size:10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600
`
const loginInitialValues={
    username:'',
    password:''
}
const signupinitialValues={
    name: '',
    username:'',
    password:''
}

const Login = ({isUserAuthenticated}) => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount]=useState('login');
    const [signup,setSignup]=useState(signupinitialValues);
    const [error,setError]=useState('');
    const [login,setLogin]=useState(loginInitialValues);
    const {setAccount}=useContext(DataContext);
    const navigate=useNavigate();

    const toggleSignup=()=>{
        account==='signup'?toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange=(e)=>{
        setSignup({...signup,[e.target.name]:e.target.value});
    }
    const signupUser=async()=>{
        let response=await API.userSignup(signup);
        if(response.isSuccess){
            setSignup(signupinitialValues);
            toggleAccount('login')
        }
        else{
            setError('Something went wrong,try again later');
        }
    }
    const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }
    const loginUser=async()=>{
        let response= await API.userLogin(login);
        if(response.isSuccess){
            setError('');

            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({username:response.data.username, name: response.data.name})

            isUserAuthenticated(true);
            navigate('/');
            
        }else{
            setError('Something went wrong,Please try again later.');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="Logo Image here" />
                {
                    account==='login'?
                 <Wrapper>
                    <TextField id="standard-basic" value={login.username} label="Enter your Username" variant="standard"  onChange={(e)=>onValueChange(e)} name="username"/>

                    <TextField id="standard-basic" label="Enter Password" value={login.password} variant="standard" onChange={(e)=>onValueChange(e)} name="password"/>

                    {error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={()=>loginUser()}>Login</LoginButton>

                    <Text style={{ textAlign: 'center' }}>OR</Text>

                    <SignupButton onClick={()=>toggleSignup()}>Create an Account</SignupButton>

                </Wrapper> :
                    <Wrapper>
                        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="Enter your Name" name='name' variant="standard" />
                        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="Enter your Username" name='username' variant="standard" />
                        <TextField id="standard-basic" onChange={(e)=>onInputChange(e)} label="Enter Password" name='password' variant="standard" />


                        {error && <Error>{error}</Error>}

                        <SignupButton onClick={()=>signupUser()}>SignUp</SignupButton>
                        <Text style={{ textAlign: 'center' }}>OR</Text>
                        <LoginButton variant="contained" onClick={()=>toggleSignup()}>Already have an account</LoginButton>
                    </Wrapper>
}
            </Box>
        </Component>
    )
}
export default Login;