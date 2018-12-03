import React from 'react';
import Media from 'react-media';
import { Container, Row, Col } from 'react-bootstrap';
import '../../scss/util.scss'

class ItemAlert extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullscreen:  true//this.props.fullscreen,
    }
  }
  render() {
    return(
      <Container fluid className="fullscreen-wrap">
        <Row style={{height: "100%"}}>
          <Col md={{span: 8, offset: 2}} sm={{span: 9, offset: 1}} className="center-vertical">
            <div className="alert-wrap">
              <Media query="(min-width: 980px)">
                { matches => matches ? (
                  <div className="alert-text">You've got
                    <div className="alert-strong center-vertical">
                    &nbsp;new items!&nbsp;
                    </div>
                    Check out your
                    <div className="alert-strong center-vertical">
                    &nbsp;Inventory.
                    </div>
                  </div>
                ):(
                  <div className="alert-text">You've got
                    <div className="alert-strong center-vertical">
                    &nbsp;new items!&nbsp;
                    </div>
                  </div>
                )}
              </Media>
            </div>
          </Col>
        </Row>
      </Container>
      );
  }
}

export default ItemAlert;
