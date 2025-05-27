import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'


import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
import EditPost from "./pages/EditPost";

import Post from "./pages/Post";

import AllPosts from "./pages/AllPosts";

// import Team from './pages/Team.jsx'
import Contact from './components/Contact/Contact.jsx'
import UserProfile from './components/Account/UserProfile.jsx'
import Testimonials from './components/Customer_Testimonials/Testimonials.jsx'
import { RevealLinks } from './components/Footer/RevealLinks.jsx'

import TermsConditions from './components/Footer/TermsConditions.jsx'
import AboutUs from './components/Footer/AboutUs.jsx'
import Feature from './components/Footer/Feature.jsx'

import Password_Generator from './components/Password_Generator.jsx'

import Privacy_Policy from './components/Footer/Privacy_Policy.jsx'

import NotFound from './pages/Pages_404.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },{
            path: "/contact",
            element: <Contact />,
        },,{
            path: "/account",
            element: <UserProfile/>
        },{
            path: "/customer_testimonials",
            element: <Testimonials/>
        },{
            path: "/links",
            element: <RevealLinks/>
        },{
            path: "/terms_and_conditions",
            element: <TermsConditions/>
        },{
            path: "/about-us",
            element: <AboutUs/>
        },{
            path: "/features",
            element: <Feature/>
        },{
            path: "/generate-password",
            element: <Password_Generator/>
        },{
            path: "/privacy-policy",
            element: <Privacy_Policy/>
        },
        {
            path: "*",
            element: <NotFound/>
        }
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
