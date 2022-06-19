import { styled, Tooltip, tooltipClasses, TooltipProps } from '@mui/material'
import React from 'react'
//@ts-ignore
import photo_cover from '../../Assets/photo-cover.svg'
import { getPhone } from '../../func/getPhone'
import { getText } from '../../func/getText'
import { IUser } from './UserList'

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
        opacity: 1,

    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        fontFamily: "Nunito",
        fontSize: "16px",
    },
}));

const UserListCard = ({ email, id, name, phone, photo, position, position_id, registration_timestamp, }: IUser) => {
    return (
        <div className='userblock-list-card'>
            <div className="userblock-list-card-image">
                <img src={photo === "https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png" ? photo_cover : photo} alt="" />
            </div>
            <BootstrapTooltip title={name} >
                <p>{getText(name)}</p>
            </BootstrapTooltip>
            <div className="userblock-list-card-details">
                <BootstrapTooltip title={position} >
                    <p>{getText(position)}</p>
                </BootstrapTooltip>
                <BootstrapTooltip title={email} >

                    <p>{getText(email)}</p>
                </BootstrapTooltip>
                <BootstrapTooltip title={getPhone(phone)} >
                    <p>{getPhone(phone)}</p>
                </BootstrapTooltip>
            </div>
        </div>
    )
}

export default UserListCard