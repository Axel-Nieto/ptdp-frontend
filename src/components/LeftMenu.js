import React,{useEffect, useState} from 'react';
import { Drawer,IconButton,List,ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const LeftMenu = (props)=>{
    const [openDrawer,setOpenDrawer] = useState(false);
    const PAGES = [
        ...props.pages,
        {
            id:0,
            name:"Cerrar Sesión",
            element:null
        }
    ];

    const pageHandler = (page)=>{
        setOpenDrawer(!openDrawer);
        page.element?props.setCurrentPage(page.element):props.logout();
    }

    return(
        <React.Fragment>
            <Drawer 
                open={openDrawer}
                onClose={()=>setOpenDrawer(false)}
            >
                <List>
                    {
                        PAGES.map((page)=>(
                            <ListItemButton key={page.id} onClick={()=>pageHandler(page)}>
                                <ListItemIcon>
                                    <ListItemText>{page.name}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        ))
                    }
                </List>
            </Drawer>
            <IconButton
                sx={{color:'white',marginLeft:'auto'}}
                onClick={()=>setOpenDrawer(!openDrawer)}
            >
                <MenuIcon/>
            </IconButton>
        </React.Fragment>
    );
}

export default LeftMenu;