import React, {useContext} from 'react';
import {useQuery} from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function Home() {
    const {user} = useContext(AuthContext);

    const {loading, data: {getPosts: posts}} = useQuery(FETCH_POSTS_QUERY);
    console.log(posts);
    return (
    <Grid columns={3}>
        <Grid.Row className = 'page-title'>
            <hi> Recent Site Diary</hi>
        </Grid.Row>
    <Grid.Row>
        {user && (
            <Grid.Column>
                <PostForm>

                </PostForm>
            </Grid.Column>
        )}
        {loading? (
            <h1>Loading diaries...</h1>
        ) : (
           <Transition.Group>
                {posts && posts.map(post => (
                <Grid.Column key = {post.id} style={{marginBottom: 20}}>
                    <PostCard post={post}/>
                </Grid.Column>
                ))}
           </Transition.Group>
        )}
    </Grid.Row>
  </Grid>
    )
}

export default Home