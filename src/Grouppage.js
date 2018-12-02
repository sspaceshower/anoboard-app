import React from 'react';
import { withRouter } from 'react-router-dom'
import { db } from './firebase'
import { loading } from './constants/loading.js';
import Group from './components/groups/group.js'

class GroupPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      loading: loading.NOTHING,
      groupName: this.props.match.params.groupname,
      students: [],
    };
  }

  componentDidMount() {
    this.fetchGroupData();
  }

  fetchGroupData(){
    this.setState({
      loading:loading.RELOADING
    });
    if(this.state.groupName !== null && this.state.groupName !== undefined){
      db.onceGetOneGroup(this.state.groupName).then(snap =>  {
        var students = [];
        snap.child("students").forEach(ss => {
          // data.push([ss.child('name').val(), ss.child('students').val()]);
          // groupNames.push(ss.child('name').val());
          students.push(ss.val());
        });

        this.setState({
          students: students,
          loaded:true,
          loading:loading.NOTHING
        });
      });
    }
  }
  render(){
    if(this.state.loaded){
      return(
        <Group groupName={this.state.groupName} students={this.state.students} location={this.props.location}/>
      )
    } else {
      return(
        <div>Loader...</div>
      );
    }
  }
}

export default withRouter(GroupPage);
