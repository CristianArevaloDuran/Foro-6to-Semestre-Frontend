'use client';

import useForums from "../lib/hooks/useForums";
import ForumsLoader from "./ForumsLoader";

export default function Forums({API_URL}) {
    
    const {forums, loading} = useForums(API_URL); 

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