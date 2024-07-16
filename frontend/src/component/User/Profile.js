import React, { Fragment, useEffect } from 'react'
import MetaData from "../layout/metaData.js"
import { useSelector } from 'react-redux'
import Loader from "../layout/Loader/Loader.js"
import {Link, useNavigate} from "react-router-dom"
import "./Profile.css"

const Profile = () => {

  let {user, loading, isAuthenticated} = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated === false && user===null){
        navigate('/login');
    }
  }, [isAuthenticated, navigate, user]);
//   console.log("User",user);
//   console.log("loading",loading);
//   console.log("Auth",isAuthenticated);
  if(isAuthenticated===undefined) user=null;
  

  return (
    <Fragment>
        {
            (loading || !user)? (
                <Loader />
            ) : (
                <Fragment>
        <MetaData title={`${user.name}'s Profile`} />
        <div className="profileContainer">
            <div>
                <h1>My Profile</h1>
                <img src={user.avatar.url} alt={user.name} />
                <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
                <div>
                    <h4>Full Name</h4>
                    <p>{user.name}</p>
                </div>
                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>
                <div>
                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>

                <div>
                    <Link to="/orders">My Orders</Link>
                    <Link to="/password/update">Change Password</Link>
                </div>
            </div>
        </div>
    </Fragment>
            )
        }
    </Fragment>
  )
}

export default Profile