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
];

const IdeasForActivity = () => {
  const { loading, error, data } = useQuery(IDEAS);

  const [getActivityByType, { loading: activityLoading, data: activityData }] =
    useLazyQuery(IDEA_BY_TYPE);

  const [idea, setIdea] = useState(false);
  const [idea1, setIdea1] = useState(false);

  useEffect(() => {
    setIdea(data?.activity?.activity);
  });

  useEffect(() => {
    console.log(activityData);
    setIdea1(activityData?.activityByType.activity);
  }, [activityData]);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <VStack spacing="24px">
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

                  // if (activityData) {
                  //   console.log(activityData);
                  //   setIdea("hi");
                  // }
                }}
              >
                {button.title}
              </Button>
            );
          })}
        </Box>
        <Box>
          {idea} <span>💡</span>
        </Box>
        <Box>{idea1}</Box>
      </VStack>
    </QueryResult>
  );
};

export default IdeasForActivity;
