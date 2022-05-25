import { useEffect } from "react";

export default function useWebsiteTitle(title) {
    // return [];
    useEffect(() => {
        document.title = title;
    }, [title])
    
}