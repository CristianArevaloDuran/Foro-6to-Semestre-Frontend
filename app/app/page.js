import AnimatedBG from "../components/AnimatedBG/AnimatedBG";
import Footer from "../components/HomePage/Footer/Footer";
import Forums from "./Forums";
import NewForum from "./NewForum";

export const metadata = {
    title: "App"
};

const API_URL = process.env.API_URL;

export default function App() {
    return (
        <div className="app">
            <Forums API_URL={API_URL} />
            <NewForum />
            <AnimatedBG />
            <Footer />  
        </div>
    )
}