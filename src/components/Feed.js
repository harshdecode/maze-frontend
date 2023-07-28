import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaImage,
  FaVideo,
  FaSmile,
  FaThumbsUp,
  FaEdit,
  FaTrash,
  FaThumbsDown,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Feed.css';
import MenuBar from './MenuBar';
import '@fortawesome/fontawesome-free/css/all.min.css'

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [isliked, setisliked] = useState(false);
  const [comments, setComments] = useState({});
  const [editPostId, setEditPostId] = useState(null);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchPosts();
  
  }, []);

  const fetchPosts = () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };

    axios
      .get('http://127.0.0.1:3000/posts-with-likes', { headers })
      .then((response) => {
        const { data } = response.data;
        setPosts(data.reverse());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const fetchComments = (postId) => {
  //   const token = localStorage.getItem('token');
  //   const headers = {
  //     Authorization: token,
  //   };
  //   const commentdata = {
  //     post_id: postId,
  //   };

  //   axios
  //     .post('http://127.0.0.1:3000/comment', commentdata, { headers })
  //     .then((response) => {
  //       const { data } = response.data;
  //       setComments((prevComments) => ({
  //         ...prevComments,
  //         [postId]: data,
  //       }));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleNewPostChange = (e) => {
    setNewPost(e.target.value);
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };

    const newPostData = {
      content: newPost,
    };

    axios
      .post('http://127.0.0.1:3000/post', newPostData, { headers })
      .then((response) => {
        console.log(response.data);
        setNewPost('');
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePostClick = (postId) => {
    const selectedPost = posts.find((post) => post.id === postId);
    navigate('/post/' + postId, { state: { post: selectedPost } });
  };
  
  const handleDeletePost = (postId) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };

    const deleteData = {
      post_id: postId,
    };

    axios
      .post(`http://127.0.0.1:3000/posts/${postId}`, deleteData, { headers })
      .then((response) => {
        console.log(response.data);
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleLikePost = (postId) => {
  //   const token = localStorage.getItem('token');
  //   const headers = {
  //     Authorization: token,
  //   };

  //   const likeData = {
  //     post_id: postId,
  //   };

  //   axios
  //     .post(`http://127.0.0.1:3000/likes`, likeData, { headers })
  //     .then((response) => {
        
  //       fetchPosts();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleDislikePost = (postId) => {
  //   const token = localStorage.getItem('token');
  //   const headers = {
  //     Authorization: token,
  //   };

  //   const likeData = {
  //     post_id: postId,
  //   };

  //   axios
  //     .post(`http://127.0.0.1:3000/dislikes`, likeData, { headers })
  //     .then((response) => {
  //       console.log(response.data);
  //       fetchPosts();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleLikeDislikePost = (postId, liked) => {
    console.log(liked);
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };
  
    const likeDislikeData = {
      post_id: postId,
    };
  
    const endpoint = liked ? 'dislikes' : 'likes';
  
    axios
      .post(`http://127.0.0.1:3000/${endpoint}`, likeDislikeData, { headers })
      .then((response) => {
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleNewCommentSubmit = (e, postId) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };
  
    const newCommentData = {
      content: comments[postId],
      post_id: postId
    };
  
    axios
      .post(`http://127.0.0.1:3000/comments`, newCommentData, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        fetchPosts();
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: '',
        }));
        // fetchComments(postId); // Fetch updated comments
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleCommentChange = (e, postId) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: e.target.value,
    }));
  };

  const handleEditPost = (postId) => {
    setEditPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
  };

  const handleSaveEdit = (postId, editedContent) => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: token,
    };
  
    const updatedPostData = {
      content: editedContent,
      post_id: postId
    };
  
    axios
      .put(`http://127.0.0.1:3000/posts/edit`, updatedPostData, {
        headers,
      })
      .then((response) => {
        console.log(response.data);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, content: editedContent } : post
          )
        );
        setEditPostId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isEditing = (postId) => {
    return editPostId === postId;
  };
    
   
   
  const handleDeleteComment = (commentId) => {


  const token = localStorage.getItem('token');

  const headers = {
    Authorization: token
   }
    

    const commentdata = {
      comment_id: commentId
     }

    axios.post(`http://127.0.0.1:3000/comments/delete`, commentdata,{headers} )
      .then((response) => {
        // If the deletion is successful, update the state
        fetchPosts();
        if (response.status === 200) {
          const updatedComments = comments.filter((comment) => comment.id !== commentId);
          setComments(updatedComments);
          
        }
      })
      .catch((error) => {
        console.error('Error deleting comment:', error);
      });
  };


  return (
    <div class='page-container'>
    <MenuBar />
  <div class='feed-container'>
    <div class='new-post-container'>
      <form onSubmit={handleNewPostSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={newPost}
          onChange={handleNewPostChange}
        ></textarea>
        <div class='new-post-icons'>
          <span><FaImage /></span>
          <span><FaVideo /></span>
          <span><FaSmile /></span>
          <button type='submit'>Post</button>
        </div>
      </form>
    </div>

    {posts && posts.length !== 0 ? (
      posts.map((post) => (
        <div key={post.id} class='post'>
          <div class='post-header'>
            {isEditing(post.id) ? (
              <textarea
                value={posts.find((p) => p.id === post.id).content}
                onChange={(e) => {
                  const updatedPosts = [...posts];
                  const index = updatedPosts.findIndex((p) => p.id === post.id);
                  updatedPosts[index].content = e.target.value;
                  setPosts(updatedPosts);
                }}
              />
            ) : (
              <h3>{post.content}</h3>
            )}
          </div>
          <div
            class='post-body'
            onClick={() => handlePostClick(post.id)}
          >
            {post.text}
          </div>
          <div class='post-footer'>
            <div class='likes-container'>
              <FaThumbsUp />
              <span class='like-count'>{post.likes}</span>
            </div>
            <div class='post-buttons'>
              {isEditing(post.id) ? (
                <>
                  <button
                    class='btn btn-success'
                    onClick={() => handleSaveEdit(post.id, post.content)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    class='btn btn-danger'
                    onClick={handleCancelEdit}
                  >
                    <FaTrash />
                  </button>
                </>
              ) : (
                <button
                  class='btn btn-warning'
                  onClick={() => handleEditPost(post.id)}
                >
                  <FaEdit />
                </button>
              )}
            </div>

            <div class='post-buttons'>
              <button
                class='btn btn-danger'
                style={{ borderRadius: '20px' }}
                onClick={() => handleDeletePost(post.id)}
              >
                <FaTrash />
              </button>

          
              <button
              class='btn'
              style={{ borderRadius: '20px' }}
              onClick={() => handleLikeDislikePost(post.id, post.liked)}
                      >
             {post.liked ? <FaThumbsDown /> : <FaThumbsUp />}
             </button>
            </div>
          </div>
          <div class='comment-section'>
            <form
              onSubmit={(e) => handleNewCommentSubmit(e, post.id)}
              class='comment-form'
            >
              <input
                type='text'
                placeholder='Write a comment...'
                value={comments[post.id] || ''}
                onChange={(e) => handleCommentChange(e, post.id)}
              />
              <button type='submit'>Comment</button>
            </form>
            {post.comments.length > 0 ? (
              <div class='comments'>
                {post.comments.map((comment) => (
                  <div key={comment ? comment.id : 0} class='comment-container'>
                    <span class='comment-text'>
                      {comment.content ? comment.content : ''}
                    </span>
                    <button
                      class='delete-button'
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No comments found.</p>
            )}
          </div>
        </div>
      ))
    ) : (
      <p>No posts found.</p>
    )}
  </div>
</div>

  );
}

export default FeedPage;
