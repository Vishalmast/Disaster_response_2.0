import "./App.css";
import React from "react";
import axios from "axios";

const labels = [
  "Related",
  "Request",
  "Offer",
  "Aid Related",
  "Medical Help",
  "Medical Products",
  "Search And Rescue",
  "Security",
  "Military",
  "Child Alone",
  "Water",
  "Food",
  "Shelter",
  "Clothing",
  "Money",
  "Missing People",
  "Refugees",
  "Death",
  "Other Aid",
  "Infrastructure Related",
  "Transport",
  "Buildings",
  "Electricity",
  "Tools",
  "Hospitals",
  "Shops",
  "Aid Centers",
  "Other Infrastructure",
  "Weather Related",
  "Floods",
  "Storm",
  "Fire",
  "Earthquake",
  "Cold",
  "Other Weather",
  "Direct Report",
];

class App extends React.Component {
  state = {
    previous: [],
    details: [],
    result: [],
    ans: [],
    color: [],
  };

  componentDidMount() {
    let data;

    axios
      .get("http://127.0.0.1:8000/wel/")
      .then((res) => {
        data = res.data.out;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleColor = (x) => {
    this.setState({
      color: "red" ? x : "green",
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let data;
    axios
      .post("http://localhost:8000/wel/", {
        detail: this.state.details,
      })
      .then((res) => {
        data = res.data.data;
        this.setState({
          previous: this.state.details,
          details: "",
          result: data,
        });
        this.print_answer(e);
      })
      .catch((err) => {});
  };

  print_answer = (e) => {
    let a;
    // a looks like this 100000000000000000000000000000000000
    a = this.state.result;
    let ans = "";
    for (let i = 0; i < 36; i++) {
      if (a[i] === 1) {
        ans = ans + labels[i] + " ";
      }
    }
    this.setState({
      ans: ans,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <h1>
            Disaster Response System

            </h1>
            </div>
          <form onSubmit={this.handleSubmit} className="headerform">
            {/* <label htmlFor="input1">Enter the sentence to classify</label> */}
            <div>
              <input
                type="text"
                id="input1"
                placeholder="Enter the sentence to classify"
                value={this.state.details}
                name="details"
                onChange={this.handleInput}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="temp_result">{this.state.previous}</div>
        <div className="newresults">
          {this.state.result.map((x, i) => (
            <div
              className="card"
              style={
                x === 1 ? { background: "#bf80ff" } : { background: "#00cc7a" }
              }
            >
              <p>{labels[i]}</p>
              {/* <p>{x}</p> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
