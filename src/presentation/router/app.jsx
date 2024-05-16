import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Body from "../pages/home/views/body";
import Chat from "../components/chat";
import Login from "../pages/home/views/login";
import ForgotPassword from "../components/forgot-password";
import Dashboard from "../pages/dashboard/dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "",
                element: <Body />
            },
            {
                path: "chat",
                element: <Chat />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <div>TODO:create page</div>
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "/:id"
            },
           
        ]
    },
    {
        path: ":section",
    },
    
    {
        path: "/dashboard",
        element:<Dashboard/>
    }


])

