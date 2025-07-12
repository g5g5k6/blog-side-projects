import React , { useEffect, useState }from 'react'
import {Link} from "react-router-dom"
import appwriteService from "../appwrite/storage.js"

function PostCard({ $id, title, featuredImage}) {
  const [imgUrl, setImgUrl] = useState("");

  // useEffect(() => {
  //   async function fetchUrl() {
  //   if (!featuredImage) {
  //     setImgUrl("");
  //     return;
  //   }
  //     const url = await appwriteService.getFilePreview(featuredImage);
  //     console.log("imgUrl:", url);
  //     setImgUrl(url);
  //   }
  //   fetchUrl();

  // }, [featuredImage]);
  return (
    <Link to={`/post/${$id}`}>
        <div
        className='w-full bg-gray-100 rounded-xl p-4'
        >
            <div
            className='w-full justify-center mb-4'
            >
            <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
            className='rounded-xl'
            />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard