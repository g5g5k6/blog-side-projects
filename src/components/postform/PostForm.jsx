import React, {useCallback, useState, useMemo} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import databaseSerice from "../../appwrite/database.js"
import storageSerice from "../../appwrite/storage.js"
import {useSelector } from "react-redux"
import { useNavigate} from "react-router-dom"
import { useTranslation } from '../../hooks/useTranslation'

function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug|| "",
            context:post?.context || "",
            status:post?.status || "active",
        }

    })
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    
    const navigate = useNavigate()
    const userData =useSelector((state) => state.auth.userData)
    const auth = useSelector(state => state.auth);
    const { t } = useTranslation();

    const submit = useCallback(async(data) => {
        setIsSubmitting(true);
        setError("");
        
        try {
            if (post) {
                // Update existing post
                let file = null;
                if (data.image[0]) {
                    try {
                        file = await storageSerice.uploadFile(data.image[0]);
                        if (file && post.featuredImage) {
                            await storageSerice.deleteFile(post.featuredImage);
                        }
                    } catch (uploadError) {
                        throw new Error("Failed to upload new image. Please try again.");
                    }
                }
                
                const dbPost = await databaseSerice.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage
                });
                
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    throw new Error("Failed to update post. Please try again.");
                }
            } else {
                // Create new post
                if (!data.image[0]) {
                    throw new Error("Please select an image for your post.");
                }
                
                let file;
                try {
                    file = await storageSerice.uploadFile(data.image[0]);
                } catch (uploadError) {
                    throw new Error("Failed to upload image. Please check file size and format.");
                }
                
                if (file) {
                    data.featuredImage = file.$id;
                    const dbPost = await databaseSerice.createPost({
                        ...data, 
                        userId: userData.$id
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        // Clean up uploaded file if post creation fails
                        await storageSerice.deleteFile(file.$id);
                        throw new Error("Failed to create post. Please try again.");
                    }
                }
            }
        } catch (error) {
            console.error("Post submission error:", error);
            setError(error.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }, [post, userData, navigate]);

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()                        
                .toLowerCase()                  
                .replace(/[^a-zA-Z\d\s]+/g, '-') 
                .replace(/\s/g, "-")            
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, {name}) => {
            if (name==="title") {
               setValue("slug", slugTransform(value.title), 
               {shouldValidate: true}) 
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const defaultValues = useMemo(() => ({
        title: post?.title || "",
        slug: post?.slug || "",
        context: post?.context || "",
        status: post?.status || "active",
    }), [post]);

    const statusOptions = useMemo(() => [
        { value: "active", label: t('posts.active') },
        { value: "inactive", label: t('posts.inactive') }
    ], [t]);
    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            {error && (
                <div className="w-full mb-4 px-2">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            )}
            <div  className="w-2/3 px-2">
                <Input 
                label={t('posts.title')}
                placeholder={t('posts.title')}
                className="mb-4"
                {...register("title", {required: true})}
                />
                <Input 
                label={`${t('posts.slug')} :`}
                placeholder={t('posts.slug')}
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                label={`${t('posts.content')}: `}
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
                label={t('posts.featuredImage')}
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={storageSerice.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                options={statusOptions}
                label={t('posts.status')}
                className="mb-4"
                {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                disabled={isSubmitting}
                >{isSubmitting ? t('posts.saving') : (post ? t('posts.update'): t('posts.submit'))}</Button>
            </div>
        </form>
    )
}

export default PostForm