import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      destination: "",
      isLactoseFree: false,
      isNutFree: false,
      isVegan: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === "checkbox" ? checked : value
    });
  }

  render() {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <form method="GET">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
          />

          <br /><br />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />

          <br /><br />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={this.state.age}
            onChange={this.handleChange}
          />

          <br /><br />

          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={this.state.gender === "male"}
              onChange={this.handleChange}
            />
            Male
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={this.state.gender === "female"}
              onChange={this.handleChange}
            />
            Female
          </label>

          <br /><br />

          <select
            name="destination"
            value={this.state.destination}
            onChange={this.handleChange}
          >
            <option value="">-- Choose Destination --</option>
            <option value="Japan">Japan</option>
            <option value="Kenya">Kenya</option>
            <option value="France">France</option>
          </select>

          <br /><br />

          <label>
            <input
              type="checkbox"
              name="isLactoseFree"
              checked={this.state.isLactoseFree}
              onChange={this.handleChange}
            />
            Lactose Free
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              name="isNutFree"
              checked={this.state.isNutFree}
              onChange={this.handleChange}
            />
            Nut Free
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              name="isVegan"
              checked={this.state.isVegan}
              onChange={this.handleChange}
            />
            Vegan
          </label>

          <br /><br />

          <button type="submit">Submit</button>
        </form>

        <hr />

        <h2>Entered Information:</h2>

        <p>
          Name: {this.state.firstName} {this.state.lastName}
        </p>

        <p>Age: {this.state.age}</p>

        <p>Gender: {this.state.gender}</p>

        <p>Destination: {this.state.destination}</p>

        <p>
          Lactose Free:
          {this.state.isLactoseFree ? " Yes" : " No"}
        </p>

        <p>
          Nut Free:
          {this.state.isNutFree ? " Yes" : " No"}
        </p>

        <p>
          Vegan:
          {this.state.isVegan ? " Yes" : " No"}
        </p>
      </div>
    );
  }
}

export default App;