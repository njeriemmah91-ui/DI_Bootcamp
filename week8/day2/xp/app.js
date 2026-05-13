import React, { Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./data.json";

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function HomeScreen() {
  return <h1>Home</h1>;
}

function ProfileScreen() {
  return <h1>Profile</h1>;
}

function ShopScreen() {
  throw new Error("Shop crashed");

  return <h1>Shop</h1>;
}

function PostList() {
  return (
    <div>
      <h2>Posts</h2>

      {data.posts.map((item, index) => (
        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h3>{item.title}</h3>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}

class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>Social Media</h2>

        {data.SocialMedias.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    );
  }
}

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>

        {data.Skills.map((item, index) => (
          <div key={index}>
            <h4>{item.Area}</h4>

            {item.SkillSet.map((skill, i) => (
              <p key={i}>{skill.Name}</p>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>

        {data.Experiences.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{item.company}</h3>

            <p>{item.role}</p>

            <p>{item.years}</p>
          </div>
        ))}
      </div>
    );
  }
}

class App extends Component {
  async sendData() {
    try {
      const response = await fetch(
        "PASTE_YOUR_WEBHOOK_URL_HERE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            key1: "myusername",
            email: "mymail@gmail.com",
            name: "Isaac",
            lastname: "Doe",
            age: 27
          })
        }
      );

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
            <div className="container-fluid">
              <NavLink
                className="nav-link text-white"
                to="/"
              >
                Home
              </NavLink>

              <NavLink
                className="nav-link text-white"
                to="/profile"
              >
                Profile
              </NavLink>

              <NavLink
                className="nav-link text-white"
                to="/shop"
              >
                Shop
              </NavLink>
            </div>
          </nav>

          <div className="container mt-4">
            <Routes>
              <Route
                path="/"
                element={
                  <ErrorBoundary>
                    <HomeScreen />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/profile"
                element={
                  <ErrorBoundary>
                    <ProfileScreen />
                  </ErrorBoundary>
                }
              />

              <Route
                path="/shop"
                element={
                  <ErrorBoundary>
                    <ShopScreen />
                  </ErrorBoundary>
                }
              />
            </Routes>

            <hr />

            <PostList />

            <hr />

            <Example1 />

            <hr />

            <Example2 />

            <hr />

            <Example3 />

            <hr />

            <button
              className="btn btn-primary"
              onClick={() => this.sendData()}
            >
              Send JSON Data
            </button>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;