import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../componenets/LoadingBox';
import Messagebox from '../componenets/Messagebox';

export default function ProfileScreen() {
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} =  userDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsUser(userInfo._id));    
    }, [dispatch, userInfo._id]);
    const submitHandler = (e) => {
        e.preventDefault();
        //dispatch 
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
                        <div>
                            <label htmlFor = "name"> Name</label>
                            <input id = "name" type = "text" placeholder = "Please Enter Name here" value={user.name}></input>
                        </div>
                        <div>
                            <label htmlFor = "email"> Email</label>
                            <input id = "email" type = "email" placeholder = "Please Enter email here" value={user.email}></input>
                        </div>
                        <div>
                            <label htmlFor = "password"> Password</label>
                            <input id = "password" type = "password" placeholder = "Please password Name here" ></input>
                        </div>
                        <div>
                            <label htmlFor = "confrimPassword">Confrim Password</label>
                            <input id = "confrimPassword" type = "password" placeholder = "Please confrim password Name here" ></input>
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
