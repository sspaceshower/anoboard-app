import {classRef} from "../firebase/firebase";
import * as firebase from "firebase";
import React from 'react'

class Class extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      classNames: [],
      class: []
    }
  }
  componentDidMount() {

    var data_list = []
    classRef.once("value").then((snapshot) => {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val().name;
        data_list.push(childData);
      });
      console.log(data_list, data_list.length);
      this.setState({
        classNames: data_list
      });

    });

    classRef.on('value', snapshot => {
      // this.setState({classes: snapshot.val().label});


      // Store all the labels in array
      var classes = [];
      snapshot.forEach(function(snap){
        var row = snap.val();
        classes.push(row);
      });

      // Store label array into state
      this.setState({
        class: classes
      });
      console.log(this.state.class)
      // console.log(Object.keys(this.state.class))
      console.log(Object.values(this.state.class)[0])
    });
  }

  renderChoices() {

  }

  render(){
    return (

      <div>
        {this.state.classNames.map((number) => {return <li>{number}</li>})}
        <li>{this.state.class.length}</li>
      </div>

    )
  }
}
export default Class;