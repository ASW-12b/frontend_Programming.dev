import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown, faReply } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import '../styles/layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function RecursiveComment(comment) {
    const c = comment.comment
    return (
        <div key={c.id}>
              <ul className="list-group comments">
                <li key={c.id} className="list-group-item comment">
                    <p><a href="" style={{textDecoration:'none'}}><span style={{color:'blue'}}>{ c.commentor }</span></a>   ·  {c.resta}</p>
                        <p>{ c.content }</p>
                        <div className="row">
                            <div className="col-auto">
                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowUp}/></a>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {c.positive}
                                </p>
                            </div>
                            <div className="col-auto">
                                    <a href="" className="link"><FontAwesomeIcon icon={faArrowDown}/></a>
                            </div>
                            <div className="col-auto">
                                <p className="mr-2">
                                    {c.negative}
                                </p>
                            </div>
                            <div className="col-auto mr-2">
                                    <a href="" className="link"><FontAwesomeIcon icon={faStar}/></a>
                            </div>
                            <div className="col-auto">
                                    <button type="button" className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal_{{c.id}}">
                                      <FontAwesomeIcon icon={faReply} />
                                    </button>
                            </div>
                                <div className="dropdown col-auto">
                                    <button className="btn btn-light dropdown-toggle p-0 text-dark" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        &#8942; 
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a className="dropdown-item" href=""><FontAwesomeIcon icon={faPenToSquare} />Editar</a></li>
                                        <li><a className="dropdown-item" href=""><FontAwesomeIcon icon={faTrashCan} />Eliminar</a></li>
                                    </ul>
                                </div>
                        </div>
                        <div className="modal fade" id="exampleModal_{{c.id}}" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h1 className="modal-title fs-5" id="exampleModalLabel">Reply</h1>
                                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                  <form action="" method="POST">
                                        <textarea style={{borderRadius:'10px'}} name="reply_comment" cols="50" rows="6"></textarea>
                                        <br></br>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-success">Responder</button>
                                        </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                        </div>
                        {c.replies && c.replies.map(reply => (
                          <ul key={reply.id} className='list-group'>
                            <RecursiveComment key={reply.id} comment={reply} />
                          </ul>
                        ))}
                      </li>
                    </ul>
                  </div>
    )

}