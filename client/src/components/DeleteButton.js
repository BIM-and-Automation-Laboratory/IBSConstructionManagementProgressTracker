import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {Button, Confirm, Icon} from 'semantic-ui-react';

import {FETCH_POSTS_QUERY} from '../util/graphql';

function DeleteButton({postId, commentId, callback}) { //rmbr to give the function destructured callback
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

    const [deletePostOrComment] = useMutation(mutation, {
        update(proxy) {
            setConfirmOpen(false)
            //TODO: remove post from cache
           if(!commentId) {
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            data.getPosts = data.getPosts.filter(p => p.id !== postId);
            proxy.writeQuery({query: FETCH_POSTS_QUERY, data});
           } else
            if (callback) callback();
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <>
            <Button floated = 'right' as = 'div' color = 'orange' basic onClick = {() => setConfirmOpen(true)}>
                <Icon name = 'eraser' style = {{margin: 0}} />
            </Button>
            <Confirm 
                open = {confirmOpen}
                onCancel = {() => setConfirmOpen(false)}
                onConfirm = {deletePostOrComment}
            />
        </>
    )
}

const DELETE_POST_MUTATION = gql `
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const DELETE_COMMENT_MUTATION = gql `
 mutation deleteComment($postId: ID!, $commentId: ID!) {
     deleteComment(postId: $postId, commentId: $commentId) {
         id
         comments {
             id
             username
             createdAt
             body
         }
         commentCount
     }
 }
`

export default DeleteButton
