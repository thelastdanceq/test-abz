import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUsers } from '../../store/reducers/ActionCreators'
import CustomButton from '../UI/CustomButton'
import UserList from './UserList'


const UserBlock = () => {
    const { showButton, isLoading, next_url } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    const handleClick = () => {
        dispatch(fetchUsers(next_url))
    }
    return (
        <div className='userblock'>
            <div className="container">
                <h1>
                    Working with GET request
                </h1>
                <UserList />
            </div>
            {showButton && <CustomButton disabled={isLoading} onClick={handleClick} width='120px' children={"Show more"} />}
        </div>
    )
}

export default UserBlock