import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AddReview from "../AddReview/AddReview";
import { TruncateString } from "@/src/Utils/utils";
import {BiUser } from 'react-icons/bi'

const Card = ({
  title,
  author,
  genre,
  description,
  image,
  id,
  handleOnClick,
  isLoading = false,
  btnText = "",
  setShowReviews,
  showReviews,
  reviews,
}) => {
  return (
    <div
      className={`w-[400px] ${
        showReviews === id ? "h-[830px]" : "h-400px"
      } mx-6 mb-5 flex flex-col min-h-[350px] overflow-hidden rounded-xl justify-between bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700`}
    >
      <div className="h-[200px] w-full">
        <img
          data-cy="image_container"
          className="h-full w-full object-cover"
          src={
            image || "https://tecdn.b-cdn.net/img/new/standard/nature/184.jpg"
          }
          alt="book_image"
        />
      </div>

      <div className="p-3">
        <h5 data-cy="title" className="mb-2 text-lg font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {title}
        </h5>
        <span className="flex font-medium leading-tight text-neutral-800 items-center gap-2">
          <BiUser className="font-medium leading-tight text-neutral-800"/>
          {author}
        </span>
        <p data-cy="desc" className="mb-4 h-12 text-base text-neutral-600 dark:text-neutral-200">
          {TruncateString(description,95)}
        </p>
        <button
          data-cy="button"
          onClick={() => handleOnClick(id)}
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          {isLoading?.id === id && isLoading?.status ? "Loading..." : btnText}
        </button>
      </div>
      {showReviews !== id && (
        <div
          onClick={() => setShowReviews(id)}
          className="p-6 flex items-center gap-2 cursor-pointer"
        >
          Show Reviews <IoIosArrowDown size={20} />{" "}
        </div>
      )}
      {showReviews === id && (
        <div className="h-[350px] px-6">
          <AddReview reviews={reviews} bookId={id} />
        </div>
      )}
      {showReviews === id && (
        <div
          onClick={() => setShowReviews("")}
          className="p-6 flex items-center gap-2 cursor-pointer"
        >
          Hide Reviews <IoIosArrowUp size={20} />{" "}
        </div>
      )}
    </div>
  );
};

export default Card;
