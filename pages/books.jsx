import InputField from "@/src/Components/TextInput/TextInput";
import Layout from "@/src/Layout/Layout";
import React, { useEffect, useState } from "react";
import Card from "../src/Components/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/src/Redux/slices/BooksSlice";
import axiosInstance from "@/src/Axios/axiosInstance";
import { apiRoutes } from "@/src/Constants/apiRoutes";

const Books = () => {
  const size = 10;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const [loading, setLoading] = useState({
    id: "",
    status: false,
  });
  const [showReviews, setShowReviews] = useState(false);
  const books = useSelector((state) => state.BooksSlice.BooksInfo?.books) || [];
  const isLoading = useSelector((state) => state.BooksSlice.BooksInfoLoading);

  useEffect(() => {
    dispatch(
      getBooks({
        page: currentPage,
        perPage: size,
        search,
      })
    );
  }, [search, currentPage]);

  function addToFavourites(id) {
    setLoading({
      id,
      status: true,
    });
    axiosInstance
      .post(apiRoutes.addToFavourites, {
        id: id,
      })
      .then((res) => {
        setLoading({
          id: "",
          status: true,
        });
        alert("Book added successfully");
      })
      .catch((err) => {
        setLoading({
          id: "",
          status: true,
        });
        alert(`${err?.response?.data?.message}`);
      });
  }

  console.log("showReviews", showReviews);

  return (
    <Layout>
      <div className="bg-gray-100 w-full overflow-y-auto h-full p-2">
        <div className="flex justify-between items-center ">
          <span className="text-2xl font-extrabold">All Books</span>
          <div className="w-80 shadow-sm">
            <InputField
              value={search}
              handleChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search by title, genre or author"
            />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap">
          {isLoading
            ? "Loading..."
            : books?.map((el) => {
                return (
                  <Card
                    key={el?.id}
                    id={el?.id}
                    author={el?.author}
                    description={el?.description}
                    genre={el?.genre}
                    title={el?.title}
                    image={el?.image}
                    btnText="Add To Favourites"
                    isLoading={loading}
                    handleOnClick={addToFavourites}
                    setShowReviews={setShowReviews}
                    showReviews={showReviews}
                  />
                );
              })}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
