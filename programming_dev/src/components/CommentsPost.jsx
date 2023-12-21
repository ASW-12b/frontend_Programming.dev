/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown, faReply } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import {useState} from 'react'
import '../styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { RecursiveComment } from './RecursiveComment'
import { deleteComment, editComment, replyComment } from '../controllers/CtrlComment'
import { Dropdown } from 'react-bootstrap';
import { voteComment,LikeComment } from '../controllers/CtrlComment'

export function CommentsPost({comments,refreshComments,likes,votes}) {
  //let postId = id
  const [deleted,setDeleted] = useState(false)
  const [EditedComment,setEditedComment] = useState(null)
  const [content, setContent] = useState('');
  const [replyModalId, setReplyModalId] = useState(null);
  const [reply,setReply] = useState('')

  function refreshSubcom() {
    console.log('refresh')
  }

  const handleReply = (commentId) => {
    setReplyModalId(commentId); // Establecer el ID del comentario para mostrar el modal de respuesta
  };

  const handleCloseReplyModal = () => {
    setReplyModalId(null); // Resetear el ID del comentario para ocultar el modal de respuesta
  };
  
  function handleDelete(commentId) {
    deleteComment(commentId)
    .then(() => {
      setDeleted(!deleted);
      refreshComments()
    })
    .catch((error) => {
      console.error('Error al eliminar el comentario:', error);
    });
  }

  function handleEdit(commentId,content) {
    setEditedComment(commentId)
    setContent(content)
  }

  function cancelEdit() {
    setEditedComment(null)
  }

  const handleContentChange = (event) => {
    setContent(event.target.value); 
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(content)
    editComment(EditedComment,content).then(() => {
      setEditedComment(null)
      refreshComments()
    })
  }

  const handleSubmitReply = (commentId,event) => {
    event.preventDefault()
    replyComment(commentId,reply).then(() => {
      setReply('')
      setReplyModalId(null)
      refreshSubcom()
      refreshComments()
    })
  }


  const handleChangeReply = (event) => {
    event.preventDefault();
    setReply(event.target.value)
  }

  const handleClickVote = async (type,commentId) => {
    await voteComment(commentId,type)
    refreshComments()
  }

  const handleClickLike = async (commentId) => {
    await LikeComment(commentId)
    refreshComments()
  }

  
    return (
      <div id="comments_section" className='custom-margin2'>
        {comments.map(c => {
          return (
            <div key={c.id}>
              <ul className="list-group comments">
                <li key={c.id} className="list-group-item comment">
                    <a href="" style={{textDecoration:'none'}}><span style={{color:'blue'}}>{ c.commentor }</span></a> a <a href="" style={{textDecoration: 'none'}}><span
                                style={{color: 'orange'}}>{ c.community }</span></a> 
                    {c.id === EditedComment ? (
                      <form method="POST" onSubmit={handleSubmit}>
                        <textarea className="form-control" name="content" onChange={handleContentChange} value={content}></textarea>
                        <br></br>
                        <div className="col">
                            <input type="submit" className="btn btn-success" value="Guardar"></input>
                            <span style={{ marginRight: '8px' }}></span>
                            <button className="btn btn-success mr-2"><a style={{textDecoration:'none', color:'white'}} onClick={cancelEdit}>Cancelar</a></button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <p>{ c.content }</p>
                        <div className="row">
                            <div className="col-auto">
                                    <FontAwesomeIcon onClick={() => {handleClickVote('positive',c.id)}} style={{color: (votes[c.id] && votes[c.id].type === 'positive') ? "#ff0000" : "inherit"}} icon={faArrowUp}/>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {c.positive}
                                </p>
                            </div>
                            <div className="col-auto">
                                    <FontAwesomeIcon onClick={() => {handleClickVote('negative',c.id)}} style={{color: (votes[c.id] && votes[c.id].type === 'negative') ? "#ff0000" : "inherit"}} icon={faArrowDown}/>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {c.negative}
                                </p>
                            </div>
                            <div className="col-auto mr-2">
                                    <FontAwesomeIcon onClick={() => {handleClickLike(c.id)}}  style={{color: (likes[c.id]) ? "#ffff00" : "inherit"}} icon={faStar}/>
                            </div>
                            <div className="col-auto">
                                    <button type="button"  className="btn btn-light btn-sm" onClick={()=> {handleReply(c.id)}}>
                                      <FontAwesomeIcon icon={faReply} />
                                    </button>
                            </div>
                                <div className="dropdown col-auto">
                                  <Dropdown>
                                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                                          &#8942;
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                          <Dropdown.Item onClick={() => handleEdit(c.id,c.content)} ><FontAwesomeIcon icon={faPenToSquare} />Editar</Dropdown.Item>
                                          <Dropdown.Item onClick={() => handleDelete(c.id)} ><FontAwesomeIcon icon={faTrashCan} />Eliminar</Dropdown.Item>
                                      </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                        </div>
                        {c.replies && c.replies.map(reply => (
                          <ul key={reply.id} className='list-group'>
                            <RecursiveComment key={reply.id} comment={reply} votes={votes} likes={likes} refreshComments={refreshComments}/>
                          </ul>
                        ))}
                        <div className="modal-fade" id={`modal_${c.id}`} tabIndex="-1" style={{ display: replyModalId === c.id ? 'block' : 'none' }}>
                          <div className="modal-dialog">
                              <div className="modal-content">
                                  <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Reply</h1>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseReplyModal}></button>
                                    </div>
                                    <div className="modal-body">
                                      <form onSubmit={(event) => {handleSubmitReply(c.id,event)}} method="POST">
                                              <textarea onChange={handleChangeReply} style={{borderRadius: '10px'}} name="reply_comment" cols="50" rows="6" value={reply}></textarea>
                                              <br></br>
                                              <div className="modal-footer">
                                                  <button type="button" className="btn btn-danger" onClick={handleCloseReplyModal}>Close</button>
                                                  <span style={{marginRight: '8px'}}></span>
                                                  <button type="submit" className="btn btn-success">Responder</button>
                                              </div>
                                      </form>
                                    </div>
                                </div>
                              </div>
                        </div> 
                      </>
                    )}
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          )
}