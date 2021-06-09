import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

import { useGlobalContext } from "../context/auth";

const Home = () => {
  const { user } = useGlobalContext();

  const posts = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recents Posts</h1>
      </Grid.Row>
      {/* <Grid.Row className="page-title" style={{ width: "70%" }}>
        
      </Grid.Row> */}
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}

        {posts.loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {posts.data.getPosts &&
              posts.data.getPosts.map((post) => {
                return (
                  <Grid.Column key={post.id} style={{ marginBottom: "22px" }}>
                    <PostCard {...post} />
                  </Grid.Column>
                );
              })}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
