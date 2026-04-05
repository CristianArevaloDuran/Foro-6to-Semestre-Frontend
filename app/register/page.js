import AnimatedBG from "../components/AnimatedBG/AnimatedBG";
import RegisterForm from "./RegisterForm";

export const metadata = {
    title: "Registro"
};

const API_URL = process.env.API_URL;

export default function RegisterPage() {
    return (
        <div id="register">
            <AnimatedBG />
            <RegisterForm API_URL={API_URL} />
        </div>
    );
}
