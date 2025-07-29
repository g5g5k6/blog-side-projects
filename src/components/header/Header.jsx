import React from 'react'
import Container from "../container/Container"
import Logo from "../Logo"
import {Link} from "react-router-dom"
import LogoutBtn from "./LogoutButton"
import LanguageToggle from "../LanguageToggle"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useTranslation } from '../../hooks/useTranslation'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const navItems = [
        {
            name: t('nav.home'),
            slug:"/",
            active:true
        },
        {
            name: t('nav.login'),
            slug:"/login",
            active:!authStatus
        },
        {
            name: t('nav.signup'),
            slug:"/signup",
            active:!authStatus
        },
        {
            name: t('nav.allPosts'),
            slug:"/all-posts",
            active:authStatus
        },
        {
            name: t('nav.addPost'),
            slug:"/add-post",
            active:authStatus
        },
    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {
                            navItems.map(
                                (item) => item.active ? (
                                        <li key={item.name}>
                                        <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >
                                        {item.name}
                                        </button>
                                        </li>

                                    ): null
                                )
                        }
                        {authStatus && (
                            <li>
                            <LogoutBtn />
                            </li>
                        )
                        }
                        <li className="ml-2">
                            <LanguageToggle />
                        </li>
                    </ul>
                </nav>
            </Container>
        </header>
    ) 
}

export default Header