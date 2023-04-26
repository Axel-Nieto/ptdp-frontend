import React,{useEffect, useState} from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import Home from "./Home";
import Peliculas from "./Peliculas";
import Acerca from "./Acerca";

const Main = (props)=>{
    const cookies = new Cookies();
    const navigate = useNavigate();
    const PAGES = [
        {
            id:1,
            name:"Inicio",
            element:<Home/>
        },
        {
            id:2,
            name:"Peliculas",
            element:<Peliculas/>
        },
        {
            id:3,
            name:"Acerca",
            element:<Acerca/>
        }
    ];
    const [currentPage,setCurrentPage] = useState(<Home/>)

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
                <>
                    <Navbar pages={PAGES} logout={cerrarSesion} setCurrentPage={setCurrentPage}/>
                    {currentPage}
                </>
                :<div></div>
            }
        </div>
    )
}

export default Main;