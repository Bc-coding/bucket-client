import React from "react";
import { IdeasForActivity } from "../components/";

const Landing = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ marginBottom: "20px" }}>Ideas for things to do ⬇ </h1>
      <IdeasForActivity />
    </div>
  );
};

export default Landing;
