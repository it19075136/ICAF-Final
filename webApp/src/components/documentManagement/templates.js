import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Download, FileWord, XLg } from 'react-bootstrap-icons';
import { Modal } from 'react-bootstrap';
import FilePreviewer from 'react-file-previewer';
import { connect } from 'react-redux';
import { getAllDocuments } from '../../redux/actions/documentActions'
import './list.css'
import { TEMPLATE } from '../../redux/constants'

class templates extends Component {

  state = {
    show: false,
    fileUrl: ''
  }

  componentDidMount() {
    this.props.getAllDocuments();
  }


  SetShow(show, url) {
    console.log('url: ', url);
    this.setState({
      fileUrl: url,
      show: show
    })
  }

  render() {

    console.log(this.props.documents)

    return (
      <div className="main">

        <div className="row">


          {this.props.documents ? this.props.documents.map(document => {
            return (
              <div className="column">
                <div className="card">
                  <Card>
                    <CardHeader
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={document.type == "TEMPLATE_RESEARCH" ? "Research Template" : "Proposal Template"}
                      subheader={document.createdAt.split('T')[0]}
                    />
                    <FileWord size={XLg} />
                    <CardActions disableSpacing>
                      <IconButton aria-label="download" >
                        <a href={document.fileUrl} target="_blank" download><Download /></a>
                      </IconButton>
                      <IconButton
                        onClick={() => this.SetShow(true, document.fileUrl)}
                      >View File</IconButton>
                    </CardActions>
                    <Modal
                      show={this.state.show}
                      onHide={() => this.SetShow(false, '')}
                      size="xl"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>Preview</Modal.Title>
                      </Modal.Header>
                      <Modal.Body >
                        <FilePreviewer file={{
                          url: this.state.fileUrl
                        }}
                        />
                      </Modal.Body>
                    </Modal>

                  </Card>
                </div>
              </div>
            )
          }) : (<h1>Loading...</h1>)}


        </div>



      </div>
    );
  }

}

const mapStateToProps = (state) => ({
  documents: state.document.documents.filter(doc => doc.activityId == TEMPLATE)
})

export default connect(mapStateToProps, { getAllDocuments })(templates)