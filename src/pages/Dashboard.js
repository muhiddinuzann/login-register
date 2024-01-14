import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (
      localStorage.getItem("token") == "" ||
      localStorage.getItem("token") == null
    ) {
      navigate("/");
    } else {
      getUser();
    }
  }, []);

  const getUser = () => {
    axios
      .get("/api/user", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const logoutAction = () => {
    axios
      .post(
        "/api/logout",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((r) => {
        localStorage.setItem("token", "");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Layout>
      <div className="flex justify-center m-auto flex-col gap-5">
        <div className="">
          <h2>Welcome, {user.name}!</h2>
        </div>
        <a className="text-blue-600 cursor-pointer" onClick={() => logoutAction()}>Logout</a>
      </div>
    </Layout>
  );
}

export default Dashboard;
