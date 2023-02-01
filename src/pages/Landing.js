import React from "react";
import { IdeasForActivity } from "../components/";
import Layout from "../components/Layout";

const Landing = () => {
  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "20px" }}>
          Looking for an idea for things to do?
        </h1>
        <IdeasForActivity />
      </div>
    </Layout>
  );
};

export default Landing;
