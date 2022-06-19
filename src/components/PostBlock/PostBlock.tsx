import React from "react"
import PostForm from "./PostForm"


const PostBlock = ({ userRef, signUpRef }: {
    signUpRef: React.RefObject<HTMLInputElement>,
    userRef: React.RefObject<HTMLInputElement>
}) => {
    return (
        <div className='postblock' ref={signUpRef}>
            <div className="container">
                <h1>Working with POST request</h1>
            </div>

            <div className="container text-container">
                <PostForm userRef={userRef} />
            </div>
        </div >
    )
}

export default PostBlock