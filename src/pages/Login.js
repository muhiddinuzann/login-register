import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") != "" &&
      localStorage.getItem("token") != null
    ) {
      navigate("/dashboard");
    }
    console.log(localStorage.getItem("token"));
  }, []);

  const loginAction = (e) => {
    setValidationErrors({});
    e.preventDefault();
    setIsSubmitting(true);
    let payload = {
      email: email,
      password: password,
    };
    axios
      .post("/api/login", payload)
      .then((r) => {
        setIsSubmitting(false);
        localStorage.setItem("token", r.data.token);
        navigate("/dashboard");
      })
      .catch((e) => {
        setIsSubmitting(false);
        if (e.response.data.errors != undefined) {
          setValidationErrors(e.response.data.errors);
        }
        if (e.response.data.error != undefined) {
          setValidationErrors(e.response.data.error);
        }
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center m-auto">
        <div>
          <div>
            <div>
              <form className="flex flex-col gap-5"
                onSubmit={(e) => {
                  loginAction(e);
                }}
              >
                {Object.keys(validationErrors).length != 0 && (
                  <p className="">
                    <small className="">Incorrect Email or Password</small>
                  </p>
                )}

                <div>
                  <label htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full text-black outline-none p-1 rounded-md"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full text-black outline-none p-1 rounded-md"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-3 flex-col">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className=" bg-slate-500 p-2 rounded-md flex justify-center m-auto w-full hover:bg-slate-400"
                  >
                    Login
                  </button>
                  <p className="flex gap-5">
                    Don't have account?
                    <Link className="text-blue-600" to="/register">Register here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
