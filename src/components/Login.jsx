import authService from "../appwrite/auth.js"
import {Link, useNavigate} from "react-router-dom"
import React, {useState} from 'react'
import Button from "./Button"
import Input from './Input'
import Logo from "./Logo"
import {useForm} from "react-hook-form"
import {useDispatch} from "react-redux"
import {login as authLogin} from "../store/authSlice"
import { useTranslation } from '../hooks/useTranslation'

function Login() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const { t } = useTranslation()
    
    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message || "Login failed. Please check your credentials.")
        }
    }
    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">{t('auth.loginTitle')}</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    {t('auth.dontHaveAccount')}&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        {t('auth.signupHere')}
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label={`${t('auth.email')} : `}
                            placeholder={t('auth.email')}
                            type="email"
                            {...register("email", {
                                required: true,
                                
                            })}
                        />
                        <Input
                            label={`${t('auth.password')} : `}
                            type="password"
                            placeholder={t('auth.password')}
                            {...register("password", { required: true })}
                        />
                        <Button type="submit" className="w-full">
                            {t('auth.login')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login