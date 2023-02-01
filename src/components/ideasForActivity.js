import React, { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { QueryResult } from "./index";
import { VStack, Box, Button } from "@chakra-ui/react";

const IDEAS = gql`
  query Activity {
    activity {
      activity
      accessibility
      type
      participants
      price
      link
      key
    }
  }
`;

const IDEA_BY_TYPE = gql`
  query ActivityByType($input: typeInput) {
    activityByType(input: $input) {
      activity
      accessibility
      type
      participants
      price
      link
      key
    }
  }
`;

const buttons = [
  { title: "Education", arg: "education" },
  { title: "Recreational", arg: "recreational" },
  { title: "Social", arg: "social" },
  { title: "DIY", arg: "diy" },
  { title: "Charity", arg: "charity" },
  { title: "Cooking", arg: "cooking" },
  { title: "Relaxation", arg: "relaxation" },
  { title: "Music", arg: "music" },
  { title: "Busywork", arg: "busywork" },
];

const IdeasForActivity = () => {
  const { loading, error, data, refetch } = useQuery(IDEAS);

  const [
    getActivityByType,
    {
      loading: activityByTypeLoading,
      error: activityByTypeError,
      data: activityByTypeData,
    },
  ] = useLazyQuery(IDEA_BY_TYPE, {
    fetchPolicy: "network-only",
  });

  return (
    <VStack spacing="24px">
      <Box>
        <QueryResult error={error} loading={loading} data={data}>
          <span>💡</span>
          <span style={{ fontWeight: "bold" }}>
            {" "}
            {data && data?.activity?.activity}
          </span>
        </QueryResult>
      </Box>
      <Button onClick={() => refetch()}>Refetch a new idea!</Button>

      <Box>
        {buttons.map(button => {
          return (
            <Button
              colorScheme="teal"
              marginRight="20px"
              size="sm"
              onClick={() => {
                getActivityByType({
                  variables: {
                    input: {
                      type: button.arg,
                    },
                  },
                });
              }}
            >
              {button.title}
            </Button>
          );
        })}
      </Box>
      <Box>
        <QueryResult
          error={activityByTypeError}
          loading={activityByTypeLoading}
          data={activityByTypeData}
        >
          {activityByTypeData?.activityByType.activity}
        </QueryResult>
      </Box>
    </VStack>
  );
};

export default IdeasForActivity;
