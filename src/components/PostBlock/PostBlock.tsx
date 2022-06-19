import React from "react"
import PostForm from "./PostForm"


const PostBlock = ({ postref }: { postref: React.RefObject<HTMLInputElement> }) => {
    return (
        <div className='postblock' ref={postref}>
            <div className="container">
                <h1>Working with POST request</h1>
            </div>

            <div className="container text-container">
                <PostForm />
            </div>
        </div >
    )
}

export default PostBlock