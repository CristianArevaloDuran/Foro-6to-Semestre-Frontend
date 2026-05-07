'use client';

import { useEffect, useState } from "react";
import ForumsLoader from "./ForumsLoader";

export default function Forums({API_URL}) {
    
    const [forums, setForums] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getForums = async () => {
            try {
                const response = await fetch(`${API_URL}/forums`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const result = await response.json();

                    setForums(result.data);
                    setLoading(false);
                    
                }
            } catch (err) {
                console.log(err);
                
            }
        }
        
        getForums();
    }, [])

    return (
        <section className="forums">
            {

                loading ? <ForumsLoader /> : 
                forums?.map(f => (
                    <a href='' key={f.id} className="forum">
                        <div className="title">
                            <div className="user-icon">
                                <p className="user">{f.profiles.username[0]}</p>
                            </div>
                            <p className="name">{f.name}</p>
                        </div>
                        <div className="description">
                            {f.description}
                        </div>
                    </a>
                ))
            }
        </section>
    )
}