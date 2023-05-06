import React,{useState,useEffect} from "react";
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from "universal-cookie";
import axios from "axios";
import '../css/Login.css';
import {Grid,TextField,Button,InputAdornment} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import UtnLogo from '../img/UtnLogo.png';
import { useNavigate } from "react-router-dom";

const Login = (props)=>{
    const [showPass,setShowPass] = useState(false);
    const [pass,setPass] = useState('');
    const [user,setUser] = useState('');
    const baseUrl='http://localhost:5000/api/Usuarios';
    const cookies=new Cookies();
    const navigate=useNavigate();

    const handlePass = (value)=>{
        setPass(value);
        if(value.length===0){
            setShowPass(false);
        }
    }

    const iniciarSesion = async()=>{
        await axios.get(baseUrl+`/${user}/${md5(pass)}`)
        .then(response=>{
            return response.data;
        })
        .then(response=>{
            if(response.length>0){
                let respuesta = response[0];
                cookies.set("id",respuesta.id,{path:"/"});
                cookies.set("apellido",respuesta.apellido,{path:"/"});
                cookies.set("nombre",respuesta.nombre,{path:"/"});
                cookies.set("correo",respuesta.correo,{path:"/"});
                cookies.set("username",respuesta.username,{path:"/"});
                cookies.set("password",respuesta.password,{path:"/"});
                alert("Bienvenido: "+respuesta.nombre+" "+respuesta.apellido);
                navigate('/main');
            }else{
                alert("El usuario o contraseña no son correctos");
            }
        })
        .catch(error=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        if(cookies.get("id")){
            navigate('/main');
        }
    },[]);

    return(
        <div>
        {!cookies.get("id")?
            <Grid container>
                <Grid container style={{height:'20vh'}} alignItems="flex-start" justifyContent="flex-start">
                    <Grid item margin={1}>
                        <img style={{width:'30%'}} src={UtnLogo} alt="utn-logo"/>
                    </Grid>
                </Grid>
                <Grid 
                item 
                container 
                direction="column" 
                spacing={3} 
                justifyContent="center" 
                alignItems="center"
                style={{height:'70vh',width:'100%'}}
                >
                    <Grid item>
                        <TextField
                        style={{minWidth:'300px'}} 
                        className="textfield" 
                        label="Usuario"
                        onChange={(e)=>setUser(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                        style={{minWidth:'300px'}} 
                        className="textfield" 
                        label="Contraseña" 
                        type={!showPass?"password":"text"}
                        InputProps={{
                            endAdornment: <InputAdornment onClick={()=>setShowPass(!showPass)} position="end">{
                                pass?
                                showPass?
                                    <VisibilityOff className="seleccionable"/>
                                    :<Visibility className="seleccionable"/>
                                :<div></div>
                            }</InputAdornment>
                        }}
                        onChange={(e)=>handlePass(e.target.value)}
                        />
                    </Grid>
                    <Grid  item>
                        <Button onClick={()=>iniciarSesion()}>Iniciar sesión</Button>
                    </Grid>
                </Grid>
                <Grid container marginRight={10} style={{height:'10vh'}} alignItems="flex-end" justifyContent="flex-end">
                    <Grid item>
                        Proyecto Final Taller de Programación 2020. UTN-CDU
                    </Grid>
                </Grid>
            </Grid>
            :<div></div>
        }
        </div>
    )
}

export default Login;