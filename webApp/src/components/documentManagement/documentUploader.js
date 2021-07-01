import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { addDocuments } from '../../redux/actions/documentActions';
import { Jumbotron } from 'react-bootstrap';
import { FileEarmarkPlus } from 'react-bootstrap-icons';
import './documentUploader.css';
import { store } from '../../redux/store'
import { ADD_DOCUMENTS } from '../../redux/constants'

function MyDropzone(props) {

  const [state, setState] = useState({
    files: []
  });

  const onDrop = useCallback(acceptedFiles => {
    setState({
      ...state,
      files: [...state.files, ...acceptedFiles]
    });
    console.log(acceptedFiles)
    store.dispatch({
      type: ADD_DOCUMENTS,
      payload: acceptedFiles
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  console.log(props.documents);

  return (
    <Jumbotron {...getRootProps()} className="dropzone" >
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <div><p>Drag 'n' drop some files here, or click to select files</p>
            {state.files.length == 0 ? <FileEarmarkPlus className="container" /> : state.files.map(file => {
              return <div className="dropzone" key={file.path}>{file.name}</div>
            })}</div>
      }
      {props.typeHint ? <p>{props.typeHint}</p> : null}
    </Jumbotron>
  )
}

const mapStateToProps = (state) => ({
  documents: state.document.documents
})

export default connect(mapStateToProps, { addDocuments })(MyDropzone)