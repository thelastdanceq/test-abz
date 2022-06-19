import React from 'react'
//@ts-ignore
import photo_cover from '../../Assets/photo-cover.svg'
import { getPhone } from '../../func/getPhone'
import { getText } from '../../func/getText'
import { IUser } from './UserList'

const UserListCard = ({ email, id, name, phone, photo, position, position_id, registration_timestamp, }: IUser) => {
    return (
        <div className='userblock-list-card'>
            <div className="userblock-list-card-image">
                <img src={photo === "https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png" ? photo_cover : photo} alt="" />
            </div>
            <p>{getText(name)}</p>
            <div className="userblock-list-card-details">
                <p>{getText(position)}</p>
                <p>{getText(email)}</p>
                <p>{getPhone(phone)}</p>
            </div>
        </div>
    )
}

export default UserListCard