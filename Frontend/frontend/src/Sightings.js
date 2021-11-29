import React, { Component } from "react";
import powell_cat from './powell_cat.jpg'; 
import Modal from "./Modal.js";

const cat_sightings = [
  {
    id: 1,
    title: "Cat sighted under the tree",
    description: "dummy",
    image: powell_cat,
    date: "2021-12-1 06:00",
    completed: true,
  },
  {
    id: 2,
    title: "Cat laying on steps to Ackerman Center",
    description: "substitute",
    image: powell_cat,
    completed: false,
    date: "2021-12-1 06:00",
  },
  {
    id: 3,
    title: "Cat laying on steps to Ackerman Center",
    description: "lol",
    completed: true,
    image: powell_cat,
    date: "2021-12-1 06:00",
  },
  {
    id: 4,
    title: "Cat laying on steps to Ackerman Center",
    description: "Cat laying on steps to Ackerman Center",
    completed: false,
    image: powell_cat,
    date: "2021-12-1 06:00",
  },
];

class Sightings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: cat_sightings,
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
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

  handleDelete = (item) => {
    alert("delete" + JSON.stringify(item));
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
    const item = { title: "", description: "", completed: false, date: this.handleDate() };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal, date: this.handleDate() });
  };


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

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          
        >
          <p class="title"> <b> {item.title} </b> <date> {item.date} </date> </p>
          <p class="description"><img src={item.image} class="photo" alt="cat.jpg"></img> &emsp;{item.description} </p>
          
          </span>
          
        <span >
          <button
            className="btn btn-success mr-2"
            onClick={() => this.editItem(item)}
          >
            upvote
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
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
              {this.renderTabList()}
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