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
import { Toast } from "@/src/Components/Toast/Toast";
import { motion, AnimatePresence } from "framer-motion";

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

  const onTheRight = { y: "100%" };
  const inTheCenter = { y: 0 };
  const onTheLeft = { y: "-100%" };
  const transition = { duration: 0.9, ease: "easeInOut" };

  return (
    <Layout>
      <AnimatePresence>
      <motion.div style={{height:"calc(100vh - 100px)"}} className="z-50 px-4 gap-2 flex items-center">
        <motion.div
             initial={{x:"-100%"}}
            animate={{x:"0%"}}
            exit={{x:"100%"}}
            transition={{
              ...transition,
            }}
        className="h-[500px] 3xl:h-[800px] card_container shadow-2xl no-scrollbar border-2 p-5 rounded-2xl">
          <div className="h-[250px] flex flex-col justify-between items-center">
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
          </div>
        </motion.div>
        <div className="w-full">
          <motion.div
            initial={onTheRight}
            animate={inTheCenter}
            exit={onTheLeft}
            transition={{
              ...transition,
            }}
            className="w-full h-[500px] 3xl:h-[800px] card_container shadow-2xl no-scrollbar border-2 p-5 rounded-2xl overflow-y-scroll"
          >
 
            {isLoading ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <CircularProgress sx={{ color: "gray" }} size={50} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-3 gap-5">
                {books?.books?.map((el) => {
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
                })}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default Books;
