import React from "react";
import { gql, useQuery } from "@apollo/client";
import { QueryResult } from "./index";

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

const IdeasForActivity = () => {
  const { loading, error, data } = useQuery(IDEAS);
  console.log(data);

  return (
    <QueryResult error={error} loading={loading} data={data}>
      <div>{data?.activity?.activity}</div>
    </QueryResult>
  );
};

export default IdeasForActivity;
