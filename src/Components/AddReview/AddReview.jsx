import React, { useEffect, useState } from "react";
import InputField from "../TextInput/TextInput";
import SubmitButton from "../Buttons/SubmitButton";
import axiosInstance from "@/src/Axios/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "@/src/Redux/slices/ReviewSlice";
import { CircularProgress } from "@mui/material";

const AddReview = ({ bookId }) => {
  const dispatch = useDispatch()
  const [newReview, setNewReview] = useState();
  const [err, setErr] = useState();
  const [isLoading, setIsLodaing] = useState(false);
  const Reviews = useSelector((state) => state.ReviewsSlice.ReviewsInfo)
  const ReviewsLoading = useSelector((state) => state.ReviewsSlice.ReviewsInfoLoading)

  useEffect(()=>{
    if(bookId){
      dispatch(getReviews({id:bookId}))
    }
  },[bookId])

  function handleAddReview(id) {
    setIsLodaing(true);
    axiosInstance
      .post(`/books/${id}/reviews`, {
        comment: newReview,
      })
      .then((res) => {
        dispatch(getReviews({id:bookId}))
        setNewReview("");
        setErr("");
        setIsLodaing(false);
      })
      .catch((err) => {
        setErr(err?.response?.data?.errors?.[0]?.msg);
        setIsLodaing(false);
      });
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1 h-[200px] overflow-y-scroll">
        {ReviewsLoading ? <div className="w-full flex items-center justify-center">
          <CircularProgress size={20} sx={{color:"gray"}}/> 
        </div>: Reviews?.reviews?.length > 0
          ? Reviews?.reviews?.map((el) => {
              return <span key={el?.id}>{el?.comment}</span>;
            })
          : "No Reviews Yet"}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <InputField
            value={newReview}
            handleChange={(e) => setNewReview(e.target.value)}
            placeholder={"Add new review.."}
          />
          <SubmitButton
            text={"Add"}
            classNames="px-4"
            isLoading={isLoading}
            handleOnClick={() => handleAddReview(bookId)}
          />
        </div>
        {err && <span className="text-red-500 text-sm">{err}</span>}
      </div>
    </div>
  );
};

export default AddReview;
