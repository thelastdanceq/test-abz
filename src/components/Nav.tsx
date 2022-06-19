//@ts-ignore
import logo from '../Assets/Logo.svg'
import CustomButton from './UI/CustomButton'


const Nav = () => {
    return (
        <div className="container">

            <nav className='nav'>

                <div className="nav-logo">
                    <div className="nav-logo-image">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
                <div className="nav-buttons">
                    <CustomButton marginRight={"10px"} >Users</CustomButton>
                    <CustomButton marginRight={"0"} >Sign up</CustomButton>
                </div>
            </nav >

        </div>

    )
}

export default Nav