import { useEffect, useState } from "react"
import axios from "axios";

export interface Blog{
  "post_id":string,
  "content" :string,
  "title":string,
  "User":{name:string},
  "createdAt":string,
}
export const useBlogs=()=>{
  const [loading,setLoading]=useState(true);
  const [blogs,setBlogs]=useState<Blog[]>([]);
  const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
  useEffect(()=>{
    axios.get(`${API_BASE_URL}/api/v1/blog/bulk`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    }).then((response)=>{
      setBlogs(response.data);
      setLoading(false);
    })

  },[])

  return {
    loading,blogs
  }
}

export const useBlog=({id}:{id:string})=>{
  const [loading,setLoading]=useState(true);
  const [blog,setBlog]=useState<Blog>();
  const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;
  useEffect(()=>{
    axios.get(`${API_BASE_URL}/api/v1/blog/${id}`,{
      headers:{
        Authorization:"Bearer "+localStorage.getItem("token")
      }
    }).then((response)=>{
      setBlog(response.data);
      setLoading(false);
    })

  },[])
  console.log(blog)
  return {
    loading,blog
  }
}