import React from 'react';
import { db } from './firebase'
import { loading } from './constants/loading.js';
import Group from './components/group.js'

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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.groupName !== prevProps.match.params.groupName) {
      this.setState(() => ({
        groupName: this.props.match.params.groupName,
        }))
    }
    if (this.props.location !== prevProps.location ) {
      this.setState(() => ({
        location: this.props.location,
      }));
    }
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
          console.log(ss.val());
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

export default GroupPage;
