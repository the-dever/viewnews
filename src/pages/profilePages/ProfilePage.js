import { useCallback, useState } from "react";
import BlogComponent from "../../components/profileComponents/BlogComponent";
import ProfileComponent from "../../components/profileComponents/ProfileComponent";
import { firebaseProjectId } from "../../context/keys";
import Loader from "../../UI/Loader";
import classes from "./ProfilePage.module.css";

const userId = localStorage.getItem("userId");

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const userInfoRequest = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://${firebaseProjectId}.com/${userId}/userInfo.json`
    );
    const data = await response.json();
    setLoading(false);
    let arr = [];
    for (const i in data) {
      arr.push({
        profilePicture: data[i].profilePicture
          ? data[i].profilePicture
          : "https://images.unsplash.com/photo-1519400197429-404ae1a1e184?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
        name: data[i].name
          ? data[i].name.length > 20
            ? `${data[i].name.slice(0, 20)}...`
            : data[i].name
          : "Not Provided",
        date: data[i].date ? data[i].date : "Not Provided",
        address: data[i].address
          ? data[i].address.length > 20
            ? `${data[i].address.slice(0, 20)}...`
            : data[i].address
          : "Not Provided",
        address2: data[i].address ? data[i].address : "Not Provided",
        phone: data[i].phone
          ? `(${data[i].phone.slice(0, 3)})-(${data[i].phone.slice(
              3,
              6
            )})-(${data[i].phone.slice(6, 10)})`
          : "Not Provided",
        phone2: data[i].phone ? data[i].phone : "Not Provided",
      });
    }
    setUserInfo(arr[arr.length - 1]);
  }, []);

  const userBlogsRequest = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `https://task-a3688-default-rtdb.firebaseio.com/${userId}/blogs.json`
    );
    const data = await response.json();
    setLoading(false);
    let arr = [];
    for (const i in data) {
      arr.push({
        blogId: i,
        blogPicture: data[i].blogPicture,
        blogTitle: data[i].blogTitle,
        blogDescription: data[i].blogDescription,
        blogText: data[i].blogText,
        blogDate: data[i].blogDate,
      });
    }
    setUserBlogs(arr);
  }, []);

  return (
    <section className={classes["profile-page"]}>
      <h1>MY PROFILE</h1>
      {loading && <Loader />}
      <ProfileComponent
        userInfoRequest={userInfoRequest}
        userId={userId}
        userInfo={userInfo}
      />
      <BlogComponent
        userId={userId}
        userBlogsRequest={userBlogsRequest}
        userBlogs={userBlogs}
      />
    </section>
  );
};

export default ProfilePage;
