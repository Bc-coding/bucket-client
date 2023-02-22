import React from "react";
import Layout from "../components/Layout";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";

import { useParams } from "react-router-dom";

const Post = () => {
  let { postId } = useParams();
  console.log(postId);
  const {
    loading: getPostLoading,
    error: getPostError,
    data: getPostData,
    refetch,
  } = useQuery(GET_POST_BY_USER, {
    variables: {
      input: {
        postId: postId,
      },
    },
  });

  console.log(getPostData);
  console.log(getPostData);
  return <Layout>Post</Layout>;
};

export default Post;
