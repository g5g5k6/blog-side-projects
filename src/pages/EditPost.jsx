import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import databaseSerice from "../appwrite/database"
import Container from "../components/container/Container"
import PostForm from "../components/postform/PostForm"
import ErrorBoundary from "../components/ErrorBoundary"

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const {slug} = useParams()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (slug) {
            setLoading(true)
            setError("")
            databaseSerice.getPost(slug)
                .then((post) => {
                    if (post) {
                        // Check if user owns this post
                        if (post.userId !== userData?.$id) {
                            setError("You don't have permission to edit this post.")
                            setTimeout(() => navigate("/"), 2000)
                            return
                        }
                        setPost(post)
                    } else {
                        setError("Post not found.")
                        setTimeout(() => navigate("/"), 2000)
                    }
                })
                .catch((err) => {
                    console.error("Error fetching post:", err)
                    setError("Failed to load post. Please try again.")
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            navigate("/")
        }
    }, [slug, navigate, userData])

    if (loading) {
        return (
            <div className='py-6'>
                <Container>
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="text-lg text-gray-600">Loading post...</div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className='py-6'>
                <Container>
                    <div className="flex justify-center items-center min-h-[200px]">
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
                            {error}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-6'>
            <Container>
                <ErrorBoundary>
                    <PostForm post={post} />
                </ErrorBoundary>
            </Container>
        </div>
    )
        
}

export default EditPost