import React from 'react'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store/index.js'
import ReactDOM from 'react-dom/client'

import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Protected from "./components/AuthLayout.jsx"
import Signup from "./pages/Signup.jsx"
import AllPost from './pages/AllPost.jsx'
import AddPost from "./pages/AddPost.jsx"
import EditPost from "./pages/EditPost.jsx"
import Post from "./pages/Post.jsx"

const router = createBrowserRouter([{
  path:"/",
  element:<App />,
  children:[
    {
      path:"/",
      element:<Home />
    },
    {
      path:"/login",
      element:(
        <Protected authentication={false}>
          <Login /> 
        </Protected>
      )
    },
    {
      path: "/signup",
          element: (
            <Protected authentication={false}>
              <Signup />
            </Protected>
          )
    },
    {
      path: "/all-post",
      element: (
        <Protected authentication={true}>
          <AllPost />
        </Protected>
      )
    },
    {
      path: "/add-post",
      element: (
        <Protected authentication>
          <AddPost />
        </Protected>
        )
    },
    {
      path: "/edit-post/:slug",
      element: (
        <Protected authentication>
          <EditPost />
        </Protected>
      )
    },
    {
      path: "/post/:slug",
      element: (
        <Protected authentication>
          <Post />
        </Protected>
      )
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
