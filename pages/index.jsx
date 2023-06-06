import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const location = useRouter()
  useEffect(()=>{
    location.push("/login")
  },[])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <CircularProgress sx={{color:"gray"}} size={50}/>
    </div>
  );
}
