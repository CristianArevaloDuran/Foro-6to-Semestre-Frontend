import { useState, useEffect } from "react";

export default function useForums(API_URL) {
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

    const addForum = () => {
        
    }

    return {forums, loading, addForum};
}