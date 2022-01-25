import React, {useContext, useState} from 'react'
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';
import { Button, Card, Form, Grid, Image, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';


function SinglePost(props) {
    const postId = props.match.params.postId;

    const {user} = useContext(AuthContext);

    const [comment, setComment] = useState('');

    const {data: {getPost}} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('')
        },
        variables: {
            postId,
            body: comment
        }
    })

    function deletePostCallBack() {
        props.history.push('/home');
    }

    let postMarkup;

    if(!getPost) {
        postMarkup = <p>Loading Diary..</p>
    } else {
        const {id, body, createdAt, username, comments, likes, likeCount, commentCount} = 
        getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width = {2}>
                    <Image
                    src = 'https://react.semantic-ui.com/images/avatar/large/molly.png'
                    size = 'small'
                    float = 'right'
                    />
                    </Grid.Column>
                    <Grid.Column width = {10}>
                        <Card.Content>
                            <Card.Header><u>{username}</u></Card.Header>
                            <Card.Meta style = {{opacity: '70%', marginBottom: '10px'}}>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description style = {{whiteSpace: 'pre-wrap'}}>{body}</Card.Description>
                        </Card.Content>
                        <hr/>
                        <Card.Content extra>
                            <LikeButton user = {user} post = {{id, likeCount, likes}} style = {{marginBottom: '15px'}}/>
                            <Button
                                as = 'div'
                                labelPosition = 'right'
                                onClick = {() => console.log('Comment on post')}
                            >
                                <Button color = 'blue' basic>
                                    <Icon name = 'comments'/>
                                </Button>
                                <Label color = 'blue' basic pointing = 'left'>
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && (
                                <DeleteButton postId = {id} callback ={deletePostCallBack}/>
                            )}
                        </Card.Content>
                        {user && (
                        <Card fluid>
                            <Card.Content>
                            <p>Post a comment</p>
                            <Form>
                                <div className="ui action input fluid">
                                <input
                                    type="text"
                                    placeholder="Comment.."
                                    name="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="ui button teal"
                                    disabled={comment.trim() === ''}
                                    onClick={submitComment}
                                >
                                    Submit
                                </button>
                                </div>
                            </Form>
                            </Card.Content>
                        </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key = {comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postId = {id} commentId = {comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup
}

//check for errors in inspect : done
const SUBMIT_COMMENT_MUTATION = gql ` 
    mutation ($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentCount
        }
    }
`

const FETCH_POST_QUERY = gql `
    query ($postId: ID!) {
        getPost(postId: $postId) {
        id
        body
        createdAt
        username
        likeCount
        likes {
            username
        }
        commentCount
        comments {
            id
            username
            createdAt
            body
        }
    }
    }
`

export default SinglePost
