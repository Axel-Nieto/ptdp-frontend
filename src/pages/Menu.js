import React,{useEffect} from "react";
import Cookies from "universal-cookie";
import {Button} from '@mui/material';
import { useNavigate } from "react-router-dom";

const Menu = (props)=>{
    const cookies = new Cookies();
    const navigate = useNavigate();

    const cerrarSesion = ()=>{
        cookies.remove("id",{path:'/'});
        cookies.remove("apellido",{path:'/'});
        cookies.remove("nombre",{path:'/'});
        cookies.remove("correo",{path:'/'});
        cookies.remove("username",{path:'/'});
        cookies.remove("password",{path:'/'});
        navigate('/');
    }

    useEffect(()=>{
        if(!cookies.get("id")){
            navigate('/');
        }
    },[]);

    return(
        <div>
            {cookies.get("id")?
                <Button onClick={()=>cerrarSesion()}>
                    Cerrar Sesión
                </Button>
                :<div></div>
            }
        </div>
    )
}

export default Menu;