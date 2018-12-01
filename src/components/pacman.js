import React from 'react';
import Loader from 'react-loaders';
import { Container, Row, Col } from 'react-bootstrap';
import '../scss/pacmanloader.scss'

class Pacman extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullscreen:  true//this.props.fullscreen,
    }
  }
  render() {
    return(
      <Container fluid className="container-float">
        <Row className="justify-content-md-center loader-fullscreen-wrap">
          <div class="col-xs-12">
            <div class="loaders single">
              <div class="loader-container">
                <div class="loader loader-active">
                  <div class="loader-inner pacman">
                    <div /><div /><div /><div /><div />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      );
  }
}

export default Pacman;
