import UserCard from "./UserCard";
import AnimatedBG from "@/app/components/AnimatedBG/AnimatedBG";

export const metadata = {
    title: 'Me'
}


export default function User() {

    return (
        <div className="user-page">
            <UserCard />
            <AnimatedBG />
        </div>
    )
}