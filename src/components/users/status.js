import React from 'react';
import Media from 'react-media';
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../../scss/userboard.scss';

class Status extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      owner: this.props.owner,
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.owner !== prevProps.owner) {
      this.setState(() => ({ owner: this.props.owner }))
    }
  }

  render() {
    return(
      <Media query="(min-width: 780px)">
        {matches => matches ? (
          <Media query="(min-width: 950px)">
            {matches => matches ? (
              <div>
                <Row className="wrap" id="status">
                  <Col xs={2} md={2}>
                    <div className="status-title">Level</div>
                    <div className="status-level">{this.state.owner.status.level}</div>
                  </Col>
                  <Col xs={10} className="col-line">
                    <div className="status-title">Equipment</div>
                    <Row className="center-content">
                      <Col xs={4}><Badge item={this.state.owner.status.trophy} /></Col>
                      <Col xs={4}><Badge item={this.state.owner.status.weapon} /></Col>
                      <Col xs={4}><Badge item={this.state.owner.status.armor} /></Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            ):(
              <div>
                <Row className="wrap" id="status">
                  <Col xs={12}>
                    <div className="status-title">Equipment</div>
                    <div className="center-content">
                      <Badge item={this.state.owner.status.trophy} />
                      <Badge item={this.state.owner.status.weapon} />
                      <Badge item={this.state.owner.status.armor} />
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Media>
        ):(
          <div>
            <Row className="wrap" id="status">
              <Col xs={12} className="col-line">
                <div className="status-title">Equipment</div>
                <Row className="center-content">
                  <Col xs={4}><Badge item={this.state.owner.status.trophy} /></Col>
                  <Col xs={4}><Badge item={this.state.owner.status.weapon} /></Col>
                  <Col xs={4}><Badge item={this.state.owner.status.armor} /></Col>
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Media>
    );
  }
}

class Badge extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.item !== prevProps.item) {
      this.setState(() => ({ item: this.props.item }))
    }
  }

  render() {
    return(
      <OverlayTrigger
      placement={"top"}
      overlay={
        <Tooltip id="tooltip">
          {this.state.item.name}
        </Tooltip>
      }
      >
        <div className="item-badge">
          <img
            src={process.env.PUBLIC_URL + this.state.item.url}
            alt={this.state.item.name}
            />
        </div>
      </OverlayTrigger>
    );
  }
}

export default Status;
