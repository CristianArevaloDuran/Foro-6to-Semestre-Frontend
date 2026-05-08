import AppClient from "../components/AppClient/AppClient";


export const metadata = {
    title: "App"
};

const API_URL = process.env.API_URL;

export default function App() {
    return (
        <div className="app">
            <AppClient API_URL={API_URL} />
        </div>
    )
}