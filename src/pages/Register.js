import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("token") != "" &&
      localStorage.getItem("token") != null
    ) {
      navigate("/dashboard");
    }
  }, []);

  const registerAction = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let payload = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };
    axios
      .post("/api/register", payload)
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
      });
  };

  return (
    <Layout>
      <div className="flex justify-center items-center m-auto">
        <div>
          <div>
            <div>
              <form className="flex flex-col gap-5" onSubmit={(e) => registerAction(e)}>
                <div>
                  <label htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full text-black outline-none p-1 rounded-md"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  {validationErrors.name != undefined && (
                    <div>
                      <small>
                        {validationErrors.name[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="email">
                    Email 
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full text-black outline-none p-1 rounded-md"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  {validationErrors.email != undefined && (
                    <div>
                      <small>
                        {validationErrors.email[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full text-black outline-none p-1 rounded-md"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {validationErrors.password != undefined && (
                    <div>
                      <small>
                        {validationErrors.password[0]}
                      </small>
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirm_password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="w-full text-black outline-none p-1 rounded-md"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex gap-3 flex-col">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className=" bg-slate-500 p-2 rounded-md flex justify-center m-auto w-full hover:bg-slate-400"

                  >
                    Register Now
                  </button>
                  <p className="flex gap-5">
                    Have already an account <Link className="text-blue-600" to="/">Login here</Link>
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

export default Register;
