import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {Button, Label, Icon} from 'semantic-ui-react';

import {AuthContext} from '../context/auth';

function LikeButton({post: {id, likeCount, likes}}) {
    const {user} = useContext(AuthContext)

    const [liked, setLiked] = useState(false);
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {variables: {postId: id}});

    const likeButton = user ? (
        liked ? (
            <Button color = 'teal'> 
            <Icon name= 'check' />
            Read
        </Button>
        ) : (
            <Button color = 'teal' basic> 
            <Icon name= 'check' />
            Read
        </Button>
        )
    ) : (
        <Button as = {Link} to = '/login' color = 'teal' basic> 
        <Icon name= 'check' />
        Read
    </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick = {likePost}>
            {likeButton}
        <Label basic color = 'teal' pointing = 'left'>
            {likeCount}
        </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql `
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likeCount
        }
    }
`

export default LikeButton
