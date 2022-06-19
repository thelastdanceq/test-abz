//@ts-ignore
import image from '../Assets/background-image.jpeg'
import CustomButton from './UI/CustomButton'


const SignIn = ({ postref }: { postref: React.RefObject<HTMLInputElement> }) => {
    const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
        window.scrollTo({
            top: ref!.current!.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    }
    return (
        <div className="signin" style={{
            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
            backgroundSize: "100% 100%",
            height: 500,
            width: "100%",
            textAlign: "center",
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }} >
            <div className="container text-container">
                <h1>
                    Test assignment for front-end developer
                </h1>
                <p
                    style={{ marginTop: 21 }}
                >What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
                </p>
                <CustomButton onClick={() => handleClick(postref)} marginRight={"0"} marginTop='32px'>Sign in</CustomButton>
            </div>
        </div >
    )
}

export default SignIn