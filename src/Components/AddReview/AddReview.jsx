import React, { useState } from "react";
import InputField from "../TextInput/TextInput";
import SubmitButton from "../Buttons/SubmitButton";
import axiosInstance from "@/src/Axios/axiosInstance";

const AddReview = ({ reviews = [], bookId }) => {
  const [newReview, setNewReview] = useState();
  const [err, setErr] = useState();
  const [isLoading, setIsLodaing] = useState(false);
  const [allReviews, setAllReviews] = useState([...reviews]);

  function handleAddReview(id) {
    setIsLodaing(true);
    axiosInstance
      .post(`/books/${id}/reviews`, {
        comment: newReview,
      })
      .then((res) => {
        console.log("res", res);
        const obj = {
          ...res.data?.review,
        };
        setAllReviews([...reviews, obj]);
        setNewReview("");
        setErr("");
        setIsLodaing(false);
      })
      .catch((err) => {
        setErr(err?.response?.data?.errors[0]?.msg);
        setIsLodaing(false);
      });
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1 h-[200px] overflow-y-scroll">
        {allReviews.map((el) => {
          return <span key={el?.id}>{el?.comment}</span>;
        })}
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
