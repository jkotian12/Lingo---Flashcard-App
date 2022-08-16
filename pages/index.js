import { React, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [info, setInfo] = useState({ username: "", password: "" });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("/api/signup", info)
          .then((res) => {
            console.log(res);
            if (res.data.status == "ok") {
              router.push(`/${res.data.id}`);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <label htmlFor="username">Username</label>
      <input
        onChange={(e) => {
          setInfo({ ...info, username: e.target.value });
        }}
        id="username"
        type="text"
      />
      <label htmlFor="password">Password</label>
      <input
        onChange={(e) => {
          setInfo({ ...info, password: e.target.value });
        }}
        id="password"
        type="password"
      />
      <button>Submit</button>
    </form>
  );
}
