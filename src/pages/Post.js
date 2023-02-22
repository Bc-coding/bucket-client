import React from "react";
import Layout from "../components/Layout";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";

const Post = () => {
  return <Layout>Post</Layout>;
};

export default Post;
