import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../scss/group.scss';
import GroupSearch from './groupSearch';

class GroupHelper extends Component {
    constructor(props) {
      super(props);

      this.state = {
        users: {},
        boards: {}
      };
    }

    // componentDidMount() {
    //   db.onceGetUsers().then(snapshot =>
    //     this.setState(() => ({ users: snapshot.val() }))
    //   );
    //   db.onceGetBoards().then(snapshot =>
    //     this.setState(() => ({ boards: snapshot.val() }))
    //   );
    // }

    render() {
      const { users,boards } = this.state;

      return (

        <AuthUserContext.Consumer>
            {authUser =>
            <GroupSearch currentUser={authUser} allBoardList={boards} users = {users}/>
            }
        </AuthUserContext.Consumer>

      );
    }
  }
