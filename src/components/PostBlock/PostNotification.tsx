import React from 'react'
//@ts-ignore
import image from "../../Assets/success-image.svg"

function PostNotification({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <>
            <img src={image} alt="" />
        </>
    )
}

export default PostNotification