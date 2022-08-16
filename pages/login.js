import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        axios
          .post("/api/login")
          .then((res) => {
            console.log(res);
            router.push();
          })
          .catch((err) => {
            console.log(err);
          });
      }}
    >
      <label htmlFor="username">Username</label>
      <input id="username" type="text" />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" />
      <button>Submit</button>
    </form>
  );
}
