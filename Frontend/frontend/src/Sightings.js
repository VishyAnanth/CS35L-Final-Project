import React, { Component } from "react";
import powell_cat from './powell_cat.jpg'; 
import Modal from "./Modal.js";



const cat_sightings = [
  {
    id: 1,
    title: "Cat sighted under the tree",
    description: "Eye of the tiger eyeing his prey that is a little earthworm",
    image: powell_cat,
    date: "2021-12-1 06:00",
    upvotes: 0,
  },
  {
    id: 2,
    title: "Cat sunbathing in the soft grass",
    description: "I'm running out of ideas pls help",
    image: powell_cat,
    date: "2021-12-1 06:00",
    upvotes: 0,

  },
  {
    id: 3,
    title: "Cat laying on steps to Ackerman Center",
    description: "Didn't submit a photo",
    date: "2021-12-1 06:00",
    upvotes: 0,

  },
  {
    id: 4,
    title: "Cat bit me uwu",
    description: "Cat laying on steps to Ackerman Center",
    image: powell_cat,
    date: "2021-12-1 06:00",
    upvotes: 0,

  },
];

class Sightings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: cat_sightings,
      modal: false,
      activeItem: {
        title: "",
        description: "",
        date: this.handleDate(),
        upvote: 0,

      },
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    alert("save" + JSON.stringify(item));
  };


  handleDate = () => {
    let date_ob = new Date();

    // adjust 0 before single digit date for consistency
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

  }

  
  createItem = () => {
    const item = { title: "", description: "", upvotes: 0, image: "", date: this.handleDate() };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  upvote = (item) => {
    item.upvotes = item.upvotes + 1 ;
    this.forceUpdate();
    alert("upvoted" + JSON.stringify(item));
    alert("upvotes = " + JSON.stringify(item.upvotes));
  };

  downvote = (item) => {
    item.upvotes = item.upvotes - 1 ;
    this.forceUpdate();
    alert("downvoted" + JSON.stringify(item));
    alert("downvotes = " + JSON.stringify(item.upvotes));
  };


/*
  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
          onClick={() => this.displayCompleted(true)}
        >
          Complete
        </span>
        <span
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
          onClick={() => this.displayCompleted(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };
*/


  renderItems = () => {
    /*
      const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );*/
    const newItems = this.state.todoList;

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          <p class="title"> <b> {item.title} </b> &emsp;
          <date> {item.date} </date> &emsp;
          <updoots> upvotes: {item.upvotes} </updoots>
          </p>
          <p class="description">
            <img src={item.image} class="photo" alt="&emsp;no_cat.jpg&emsp;&emsp;&emsp;"></img> 
            &emsp;{item.description} 
            </p>
          
          </span>
          
        <span >
          <button
            className="btn btn-success mr-2"
            onClick={() => this.upvote(item)}
          >
            upvote
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.downvote(item)}
          >
            downvote
          </button>
        </span>
      </li>
      

    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Powell Cat Sighting Reports</h1>
        {/* <img  src={powell_cat}   className="center" alt="powell"/> */}
        <div className="row">
          <div className="col-md-12 col-sm-16 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add a sighting
                </button>
              </div>
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default Sightings;