import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../services/auth.service"
import { useRouter } from "next/navigation"


export const useAuth = () => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const signupMutation = useMutation({
        mutationFn : ({ username, email, password } : { username: string, email: string, password: string}) => authService.signup(username,email,password),
        onSuccess : (data) => {
            localStorage.setItem("authHeader", "Bearer "+ data.token)
            queryClient.setQueryData(['userId'], data.userId)
            router.push('/homepage')
        },
        onError : (error: any) => {
            const errorMessage = error.response?.data?.error
            console.log(errorMessage);
        }
    })

    const signinMutation = useMutation({
        mutationFn : ({ email, password } : { email: string, password: string}) => authService.signin(email,password),
        onSuccess : (data) => {
            localStorage.setItem("authHeader", "Bearer "+ data.userId)
            queryClient.setQueryData(['userId'], data.userId)
            router.push('/homepage')
        },
        onError : (error: any) => {
            const errorMessage = error.response?.data?.error
            console.log(errorMessage);
        } 
    })

    return{
        signupMutation,
        signinMutation
    }
}