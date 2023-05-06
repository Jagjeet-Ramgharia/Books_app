import Layout from "@/src/Layout/Layout";
import { getFavourites } from "@/src/Redux/slices/FavouriteSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../src/Components/Cards/Card";
import axiosInstance from "@/src/Axios/axiosInstance";
import { apiRoutes } from "@/src/Constants/apiRoutes";

const Profile = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    id: "",
    status: false,
  });
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
        console.log(res);
        alert("Book removed successfullt");
        dispatch(getFavourites({}));
        setLoading({
          id: "",
          status: false,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading({
          id: "",
          status: false,
        });
      });
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
        <div className="flex flex-col gap-4 mb-10">
          <span className="text-3xl font-extrabold">User Details</span>
          <Details title={"User Name"} value={user?.name} />
          <Details title={"Email"} value={user?.email} />
        </div>
        <div>
          <span className="text-3xl font-extrabold">Favourites</span>
          <div className="flex flex-wrap">
            {isLoading
              ? "Loading..."
              : Favourites?.map((el) => {
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
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
