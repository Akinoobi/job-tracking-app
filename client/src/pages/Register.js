import Wrapper from "../assets/wrappers/RegisterPage"
import { useState } from "react"
import { FormRow, Logo } from "../components"

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}
const Register = () => {
    const [values, setValues] = useState(initialState)
    // global state and useNavigate

    const handleChange = (e) => {
        console.log("e", e.target)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
    }
    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>Login</h3>
                {/* name input */}
                <FormRow/>
                <button type='submit' className="btn btn-block">
                    submit
                </button>
            </form>
        </Wrapper>
    )
}

export default Register