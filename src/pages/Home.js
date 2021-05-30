import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY)

  return (
    <Grid columns={2}>
      <Grid.Row className="page-title">
        <h2>Another Social Media Application</h2>
      </Grid.Row>
      <Grid.Row className="page-title">
        {user ? (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        ) : (
          <h2>Login/Register to Post, Comment, and Like!</h2>
        )}
        </Grid.Row>
        <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;