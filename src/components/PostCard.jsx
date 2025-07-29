import React, { useMemo } from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/storage.js"

function PostCard({ $id, title, featuredImage}) {
  const imageUrl = useMemo(() => {
    return featuredImage ? appwriteService.getFilePreview(featuredImage) : null;
  }, [featuredImage]);

  const linkUrl = useMemo(() => `/post/${$id}`, [$id]);

  return (
    <Link to={linkUrl}>
        <div
        className='w-full bg-gray-100 rounded-xl p-4'
        >
            <div
            className='w-full justify-center mb-4'
            >
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={title}
                className='rounded-xl'
                loading="lazy"
              />
            )}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard