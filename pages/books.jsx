import InputField from "@/src/Components/TextInput/TextInput";
import Layout from "@/src/Layout/Layout";
import React, { useEffect, useState } from "react";
import Card from "../src/Components/Cards/Card";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/src/Redux/slices/BooksSlice";
import axiosInstance from "@/src/Axios/axiosInstance";
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { CircularProgress, Pagination } from "@mui/material";
import { getGenres } from "@/src/Redux/slices/GenresSlice";
import { getAuthors } from "@/src/Redux/slices/AuthorSlice";
import CustomSelect from "@/src/Components/SelectComponent/Select";
import SubmitButton from "@/src/Components/Buttons/SubmitButton";
import { Toast } from "@/src/Components/Toast/Toast";

const Books = () => {
  const size = 10;
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const [delayedSearch, setDelayedSearch] = useState(null);
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState({
    id: "",
    status: false,
  });
  const [showReviews, setShowReviews] = useState(false);
  const books = useSelector((state) => state.BooksSlice.BooksInfo) || [];
  const isLoading = useSelector((state) => state.BooksSlice.BooksInfoLoading);
  const Authors = useSelector((state) => state.AuthorsSlice.AuthorsInfo);
  const Genres = useSelector((state) => state.GenresSlice.GenresInfo);

  useEffect(() => {
    if (search) {
      if (delayedSearch) {
        delayedSearch.cancel();
      }
      const debounceSearch = setTimeout(async () => {
        dispatch(
          getBooks({
            page: currentPage,
            perPage: size,
            search,
            author,
            genre,
          })
        );
      }, 500);
      setDelayedSearch({
        cancel: () => clearTimeout(debounceSearch),
      });
    } else {
      dispatch(
        getBooks({
          page: currentPage,
          perPage: size,
          search,
          author,
          genre,
        })
      );
    }
  }, [search, currentPage, author, genre]);

  useEffect(() => {
    dispatch(getGenres({}));
  }, []);

  useEffect(() => {
    dispatch(getAuthors({}));
  }, []);

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
        Toast("success", "Add to favourites", "Book added successfully.");
      })
      .catch((err) => {
        setLoading({
          id: "",
          status: true,
        });
        Toast("error", "Add to favourites", `${err?.response?.data?.message}`);
      });
  }

  return (
    <Layout>
      <div className="bg-gray-100 w-full overflow-y-auto h-full">
        <div className="flex justify-between items-center my-5 mx-3">
          <span className="text-2xl font-extrabold">All Books</span>
          <CustomSelect
            options={Authors?.authors || []}
            value={author}
            setValue={setAuthor}
            label={"Author"}
          />
          <CustomSelect
            options={Genres?.genres || []}
            value={genre}
            setValue={setGenre}
            label={"Genre"}
          />

          {books?.totalPages && (
            <Pagination
              count={books?.totalPages || 0}
              onChange={(e, page) => setCurrentPage(page)}
            />
          )}
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
          {isLoading ? (
            <div className="w-screen h-[600px] flex items-center justify-center">
              <CircularProgress sx={{ color: "gray" }} size={50} />
            </div>
          ) : (
            books?.books?.map((el) => {
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
                  reviews={el?.reviews}
                />
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Books;
