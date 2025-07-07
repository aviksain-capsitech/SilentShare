import { useEffect, useState } from "react";
import { getUserApi } from "../Apis/user";
import { axiosInstance } from "../Helper/axiosInstance";

function AuthLayout() {
  const [user, setUser] = useState({});

  useEffect(() => { 
    const fetchData = async () => {
      const res = await getUserApi();
      setUser(res);
    }

    fetchData();

  },[])


  return (
    <>
      
    </>
  )
}

export default AuthLayout