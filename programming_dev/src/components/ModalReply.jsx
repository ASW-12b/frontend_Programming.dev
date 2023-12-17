/* eslint-disable react/prop-types */
import {useState} from 'react'
export function ModalReply({commentId}) {
    const [show,setShow] = useState(false)
    return (
    <div className="modal fade" id={`modal_${commentId}`} tabIndex="-1" style={{ display: show ? 'block' : 'none' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Reply</h1>
                <button type="button" className="btn-close" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form action="" method="POST">
                        <textarea style={{borderRadius: '10px'}} name="reply_comment" cols="50" rows="6"></textarea>
                        <br></br>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger">Close</button>
                            <button type="submit" className="btn btn-success">Responder</button>
                        </div>
                </form>
                </div>
            </div>
        </div>
    </div> 
    )
}