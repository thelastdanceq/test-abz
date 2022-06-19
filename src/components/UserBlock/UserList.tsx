import { CircularProgress } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchUsers } from '../../store/reducers/ActionCreators'
import UserListCard from './UserListCard'
export interface IUser {
    email: string
    id: number
    name: string
    phone: string
    photo: string
    position: string
    position_id: number
    registration_timestamp: number
}


const UserList = () => {
    const { error, isLoading, users } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchUsers("https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"))
    }, [dispatch])
    return (
        <>

            <div className='userblock-list'>
                {isLoading && <CircularProgress color="secondary" />}
                {error && <h1>{error}</h1>}
                {users.map(user => <UserListCard key={user.id}  {...user} />)}
            </div>
        </>

    )
}

export default UserList