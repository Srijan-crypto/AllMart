import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../../actions/userAction';

const UserOptions = ({user}) => {

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard });
  }

  function dashboard() {
    navigate('/admin/dashboard');
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    toast("Logged Out Successfully");
  }

  return(
    <Fragment>
        <Backdrop open={open} style={{ zIndex: "10" }} />
        <SpeedDial
            ariaLabel='SpeedDial tooltip example'
            onClose={()=> setOpen(false)}
            onOpen={()=>setOpen(true)}
            style={{zIndex: "11"}}
            open={open}
            direction='down'
            className='speedDial'
            icon={
                <img
                    className='speedDialIcon'
                    // src='https://res.cloudinary.com/dvtqbpwzf/image/upload/v1721051721/avatars/sydbjtswp5idou1lcdmk.jpg'
                    src={user.avatar.url ? user.avatar.url : "logo512.png"}
                    alt='Profile'
                />
            }
        >
        {options.map((item) => (
            <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} tooltipOpen={window.innerWidth <= 600 ? true : false}/>
        ))}
            
        </SpeedDial>
  </Fragment>
  ) 
}

export default UserOptions