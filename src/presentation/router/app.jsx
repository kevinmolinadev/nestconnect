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
import Moderators from "../pages/dashboard/views/moderators";
import InformationRecord from "../components/informaction-record";
import Queries from "../pages/dashboard/views/queries";

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
                element: <Section className={" md:w-11/12 lg:w-9/12 my-8"} />
            },
            {
                path: ":section/:id",
                element: <InformationRecord />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "queries",
                element: <Queries />
            },
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
                        element: <Moderators />
                    },
                ]
            },
            {
                path: ":name/records/:id",
                element: <InformationRecord />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

