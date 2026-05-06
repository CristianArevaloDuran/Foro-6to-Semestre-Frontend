import AnimatedBG from "../components/AnimatedBG/AnimatedBG";
import LoginForm from "./LoginForm.js"

export const metadata = {
    title: "Login"
}

const API_URL = process.env.API_URL;

export default function Login() {
    return (
        <div id="login">
            <LoginForm API_URL={API_URL} />
            <AnimatedBG />
        </div>
    )
}