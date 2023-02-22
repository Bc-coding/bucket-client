import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import Layout from "../components/Layout";
import { useQuery, useLazyQuery } from "@apollo/client";
import { READ_ALL_BUCKET_LIST_BY_USER } from "../queries/index";
import { QueryResult } from "../components/index";

const BucketList = () => {
  const {
    loading: readAllListLoading,
    error: readAllListError,
    data: readAllListData,
    refetch,
  } = useQuery(READ_ALL_BUCKET_LIST_BY_USER, { fetchPolicy: "network-only" });

  return (
    <Layout>
      <QueryResult
        error={readAllListError}
        loading={readAllListLoading}
        data={readAllListData}
      >
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {readAllListData?.readAllBucketList.posts.map((item, i) => {
            return (
              <Card key={item.id}>
                <CardHeader>
                  <Heading size="md">{item.title}</Heading>
                </CardHeader>
                <CardBody>
                  <Text>{item.desc}</Text>
                </CardBody>
                <CardFooter>
                  <Link href={`/post/${item.id}`}>
                    <Button as="a" aria-label="view post">
                      <span style={{ marginRight: "10px" }}>{item.emoji}</span>
                      View Here
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </SimpleGrid>
      </QueryResult>
    </Layout>
  );
};

export default BucketList;
