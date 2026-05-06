'use client';

import { useAuth } from "@/app/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function UserCard() {

    const { user, loading, logout } = useAuth();
    const router = useRouter();

    return (
        <div className="user-container">
            <div className="user">
                <div className="user-icon">
                    <p>{user?.user?.user_metadata?.username?.[0]}</p>
                </div>
                <div className="user-header">
                    <h2>{user?.user?.user_metadata?.username}</h2>
                    <p>{user?.user?.user_metadata?.name}</p>
                </div>
            </div>
        </div>
    )
}