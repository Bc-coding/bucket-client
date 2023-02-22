import React, { useEffect } from "react";
import styled from "@emotion/styled";
import Layout from "../components/Layout";

import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_POST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";

import { Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const Post = () => {
  let { postId } = useParams();

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

  const Post = ({ post }) => {
    console.log(post.getPostBucketList);
    const {
      category,
      completed,
      createdAt,
      date,
      desc,
      id,
      location,
      memo,
      title,
      updatedAt,
    } = post.getPostBucketList.post;

    return (
      <>
        <CoverImage
          src="https://gaijinpot.scdn3.secure.raxcdn.com/app/uploads/sites/4/2014/12/hello-kitty-1024x640.jpg"
          alt=""
        />
        <PostDetails>
          <DetailRow>
            <h1>{title}</h1>
          </DetailRow>
          <DetailRow>
            <DetailItem>
              <h4>Item details</h4>
              <IconAndLabel>
                <div id="category">category: {category}</div>
              </IconAndLabel>
              <IconAndLabel>
                <div id="location">location: {location}</div>
              </IconAndLabel>
              <IconAndLabel>
                <div id="created-at">
                  created at: {parseInt(createdAt) * 1000}
                </div>
              </IconAndLabel>
              <IconAndLabel>
                <div id="completed">completed: {completed ? "Yes" : "No"}</div>
              </IconAndLabel>
            </DetailItem>
            {/* <DetailItem>
              <h4>Author</h4>
              <AuthorImage src={author.photo} />
              <AuthorName>{author.name}</AuthorName>
            </DetailItem> */}
            <div>
              {/* <StyledLink to={`./module/${modules[0]["id"]}`}> */}
              <Button>Update </Button>
              {/* </StyledLink> */}
            </div>
          </DetailRow>
          <ModuleListContainer>
            <DetailItem>
              <h4>Description</h4>
              {desc}
            </DetailItem>
          </ModuleListContainer>
        </PostDetails>{" "}
      </>
    );
  };

  // console.log(getPostError);
  // console.log(getPostData);

  return (
    <Layout>
      <QueryResult
        error={getPostError}
        loading={getPostLoading}
        data={getPostData}
      >
        {getPostData && <Post post={getPostData} />}
      </QueryResult>
    </Layout>
  );
};

export default Post;

/** Track detail styled components */
const CoverImage = styled.img({
  objectFit: "cover",
  maxHeight: 400,
  width: "100%",
  borderRadius: 4,
  marginBottom: 30,
});

// const StyledLink = styled(Link)({
//   textDecoration: "none",
//   color: "white",
// });

const PostDetails = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: 20,
  borderRadius: 4,
  marginBottom: 30,
  border: `solid 1px lightgrey`,
  backgroundColor: "white",
  h1: {
    width: "100%",
    textAlign: "center",
    marginBottom: 5,
  },
  h4: {
    fontSize: "1.2em",
    marginBottom: 5,
    // color: colors.text,
  },
});

const DetailRow = styled.div({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  paddingBottom: 20,
  marginBottom: 20,
  borderBottom: `solid 1px lightgrey`,
});

const DetailItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  //   color: colors.textSecondary,
  alignSelf: "center",
});

const AuthorImage = styled.img({
  height: 30,
  width: 30,
  marginBottom: 8,
  borderRadius: "50%",
  objectFit: "cover",
});

const AuthorName = styled.div({
  lineHeight: "1em",
  fontSize: "1em",
});

const IconAndLabel = styled.div({
  display: "flex",
  flex: "row",
  alignItems: "center",
  maxHeight: 20,
  width: "100%",
  div: {
    marginLeft: 8,
  },
  svg: {
    maxHeight: 16,
  },
  "#viewCount": {
    // color: colors.pink.base,
  },
});

const ModuleListContainer = styled.div({
  width: "100%",
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    marginTop: 5,
    li: {
      fontSize: "1em",
      display: "flex",
      justifyContent: "space-between",
      paddingBottom: 2,
    },
  },
});

const ModuleLength = styled.div({
  marginLeft: 30,
  //   color: colors.grey.light,
});
