import {useEffect} from "react";

export const RedirectTo = ({module}) => {
    useEffect(() => {
        switch (module) {
            case "cms":
                window.location.href = 'http://localhost:3002/cms';
                break;
            case "login":
                window.location.href = 'http://localhost:3000/login';
                break
            case "restaurant":
                window.location.href = 'http://localhost:3000/restaurant';
                break;
            default:
                window.location.href = 'http://localhost:3000/login';
        }
    }, [module]);
    return null; // This component doesn't render anything
}