import LoginForm from "./LoginForm"

export const metadata = {
    title: "Login"
}

const API_URL = process.env.API_URL;

export default function Login() {
    return (
        <div id="login">
            <LoginForm API_URL={API_URL} />
        </div>
    )
}