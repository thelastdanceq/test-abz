//@ts-ignore
import logo from '../Assets/Logo.svg'
import CustomButton from './UI/CustomButton'


const Nav = ({ userRef, signUpRef }: {
    signUpRef: React.RefObject<HTMLInputElement>,
    userRef: React.RefObject<HTMLInputElement>
}) => {
    const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
        window.scrollTo({
            top: ref!.current!.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    }
    return (
        <div className="container">

            <nav className='nav'>

                <div className="nav-logo">
                    <div className="nav-logo-image">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className="nav-buttons">
                    <CustomButton onClick={() => { handleClick(userRef) }} marginRight={"10px"} >Users</CustomButton>
                    <CustomButton onClick={() => { handleClick(signUpRef) }} marginRight={"0"} >Sign up</CustomButton>
                </div>
            </nav >

        </div>

    )
}

export default Nav