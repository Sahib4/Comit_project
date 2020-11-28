import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confrimPassword, setConfrimPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} =  userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const  {loading: laodingUpdate, error: errorUpdate, success: successUpdate} = userUpdateProfile

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));   
        }else {
            setName(user.name);
            setEmail(user.email);
        }
         
    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confrimPassword ) {
            alert('Password do not match')
        }else{ 
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }

    return (
        <div>
            <form className = "form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox></LoadingBox>
                    :
                    error ? <Messagebox variant = "danger">{error}</Messagebox>
                    :
                    <>
                    {laodingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (<Messagebox variant = "danger">{errorUpdate}</Messagebox>)}
                    {successUpdate && <Messagebox variant = "success">Profile Updated Successfully</Messagebox>}

                        <div>
                            <label htmlFor = "name"> Name</label>
                            <input id = "name" type = "text" placeholder = "Please Enter Name here" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor = "email"> Email</label>
                            <input id = "email" type = "email" placeholder = "Please Enter email here" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor = "password"> Password</label>
                            <input id = "password" type = "password" placeholder = "Please password Name here" onChange = {(e) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor = "confrimPassword">Confrim Password</label>
                            <input id = "confrimPassword" type = "password" placeholder = "Please confrim password Name here" onChange = {(e) => setConfrimPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label />
                            <button className = "primary" type = "submit">Update</button>
                        </div>
                    </>

                }
            </form>
        </div>
    )
}
