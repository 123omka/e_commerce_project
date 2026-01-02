import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../features/profile/profileSlice";

function Profile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  return <h1>Welcome {user.name}</h1>;
}

export default Profile;
