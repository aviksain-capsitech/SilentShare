import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';

interface AuthContainerProps {
    children: ReactNode;
    authentication?: boolean // true = auth only, false = guest only, undefined = public
}

function AuthContainer({ children, authentication = undefined }: AuthContainerProps) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const user = useSelector((state: any) => state.auth?.status);

    useEffect(() => {
        if (authentication !== null && user === null) {
            navigate("/login");
        } else if (authentication === null && user !== null) {
            navigate("/");
        }

        const timer = setTimeout(() => setLoader(false), 300);
        return () => clearTimeout(timer);
    }, [user, navigate, authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthContainer;