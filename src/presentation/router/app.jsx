import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/home";
import Body from "../pages/home/views/body";
import Chat from "../components/chat";
import Login from "../pages/home/views/login";
import ForgotPassword from "../components/forgot-password";
import Dashboard from "../pages/dashboard/dashboard";
import SignUp from "../pages/home/views/signup";
import NotFound from "../pages/404";
import List from "../pages/dashboard/views/list";
import ListRecord from "../pages/dashboard/views/list-record";
import Section from "../components/section";

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
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <SignUp />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: ":section",
                element: <Section />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: ":name",
                element: <List />,
                children: [
                    {
                        path: "",
                        element: <ListRecord />
                    },
                    {
                        path: "records",
                        element: <ListRecord />
                    },
                    {
                        path: "moderators",
                        element: <div>Seccion de los moderadores</div>
                    }
                ]
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

