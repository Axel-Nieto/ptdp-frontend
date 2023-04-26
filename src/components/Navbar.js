import React,{useState} from 'react';
import {AppBar,Tab,Tabs,Toolbar,Typography,Button,useMediaQuery,useTheme} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LeftMenu from './LeftMenu';

const Navbar = (props)=> {

    const [value,setValue] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));
    const PAGES = props.pages;

    return (
        <AppBar position="static">
            <Toolbar>
                {isMatch?(
                    <>
                        <LeftMenu pages={PAGES} logout={props.logout} setCurrentPage={props.setCurrentPage}/>
                    </>
                ):
                (
                    <>
                        <Tabs 
                            textColor='inherit' 
                            value={value} 
                            onChange={(e,value)=>setValue(value)} 
                            indicatorColor='secondary'
                            sx={{marginLeft:'auto'}}
                            >
                            {
                                PAGES.map((page)=>(
                                    <Tab key={page.id} label={page.name} onClick={()=>{props.setCurrentPage(page.element)}}/>
                                ))
                            }
                        </Tabs>
                        <LogoutIcon 
                            sx={{marginLeft:'auto'}} 
                            color='inherit' 
                            onClick={()=>props.logout()}
                            className='seleccionable'
                        />
                    </> 
                )}
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;