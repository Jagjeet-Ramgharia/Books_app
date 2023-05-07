import Layout from "@/src/Layout/Layout";
import {
  getFavourites,
  resetFavourites,
} from "@/src/Redux/slices/FavouriteSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../src/Components/Cards/Card";
import axiosInstance from "@/src/Axios/axiosInstance";
import { apiRoutes } from "@/src/Constants/apiRoutes";
import { useRouter } from "next/router";
import { resetUser } from "@/src/Redux/slices/UserSlice";
import { resetGenres } from "@/src/Redux/slices/GenresSlice";
import { resetBooks } from "@/src/Redux/slices/BooksSlice";
import { resetAuthors } from "@/src/Redux/slices/AuthorSlice";
import SubmitButton from "@/src/Components/Buttons/SubmitButton";
import { CircularProgress } from "@mui/material";
import { Toast } from "@/src/Components/Toast/Toast";

const Profile = () => {
  const location = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    id: "",
    status: false,
  });
  const [isLogout, setIsLogout] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const user = useSelector((state) => state.UserSlice?.userInfo);
  const Favourites =
    useSelector((state) => state.FavouriteSlice.FavouriteInfo?.books) || [];
  const isLoading = useSelector(
    (state) => state.FavouriteSlice.FavouriteInfoLoading
  );

  useEffect(() => {
    dispatch(getFavourites({}));
  }, []);

  function removeFromFavourites(id) {
    setLoading({
      id,
      status: true,
    });
    axiosInstance
      .delete(`${apiRoutes.removeFavourites}/${id}`)
      .then((res) => {
        dispatch(getFavourites({}));
        setLoading({
          id: "",
          status: false,
        });
        Toast("success", "Removed from favourite", "Book removed successfully");
      })
      .catch((err) => {
        setLoading({
          id: "",
          status: false,
        });
        Toast(
          "error",
          "Removed from favourite",
          "Something went wrong. Please try again"
        );
      });
  }

  function handleLogOut() {
    setIsLogout(true);
    dispatch(resetAuthors());
    dispatch(resetBooks());
    dispatch(resetFavourites());
    dispatch(resetGenres());
    dispatch(resetUser());
    localStorage.clear();
    location.push("/login");
    setIsLogout(false);
  }

  const Details = ({ title, value }) => {
    return (
      <div className="flex items-center">
        <span className="w-[100px]">{`${title} :`}</span>
        <span className="w-max">{value}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-gray-100 w-full overflow-y-auto h-full p-2">
        <div className="flex w-full items-center justify-center my-7">
          <div className="flex flex-col gap-4 border-gray-50 border shadow-lg p-6 rounded-lg">
            <span className="text-3xl font-extrabold">User Details</span>
            <Details title={"User Name"} value={user?.name} />
            <Details title={"Email"} value={user?.email} />
            <SubmitButton
              classNames={"w-32 px-2"}
              text={"Logout"}
              handleOnClick={handleLogOut}
              isLoading={isLogout}
            />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-3xl font-extrabold">Favourites</span>
          <div className="flex flex-wrap">
            {isLoading ? (
              <div className="w-screen h-[500px] flex items-center justify-center">
                <CircularProgress sx={{ color: "gray" }} size={50} />
              </div>
            ) : Favourites?.length > 0 ? (
              Favourites?.map((el) => {
                return (
                  <Card
                    author={el?.author}
                    description={el?.description}
                    genre={el?.genre}
                    id={el?.id}
                    image={el?.image}
                    title={el?.title}
                    key={el?.id}
                    btnText="Remove from favourite"
                    handleOnClick={removeFromFavourites}
                    isLoading={loading}
                    showReviews={showReviews}
                    setShowReviews={setShowReviews}
                    reviews={el?.reviews}
                  />
                );
              })
            ) : (
              <div className="w-full text-center text-xl mt-4">
                No data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
