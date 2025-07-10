import { useEffect } from "react";
import { AuthContainer } from "./Components";
import Layout from "./Layout";
import { Home, Dashboard, Login, SignUp, SendMessagePage, NotFoundPage, FeedbackPage } from "./Pages";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { getUserApi } from "./Apis/user";
import { useDispatch } from "react-redux";
import { saveUserData } from "./Redux/Slices/authSlice";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/signup" element={<AuthContainer authentication={false}><SignUp /></AuthContainer>} />
      <Route path="/login" element={<AuthContainer authentication={false}><Login /></AuthContainer>} />
      <Route path="/dashboard" element={<AuthContainer authentication={true}><Dashboard /></AuthContainer>} />
      <Route path="/u/:username" element={<SendMessagePage />} />
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      dispatch(saveUserData(res.data));
    }

    fetchUser();
  },[]);
  return <RouterProvider router={route} />
}

export default App