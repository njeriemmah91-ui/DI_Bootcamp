import { useState, Component } from "react";

// ─── ErrorBoundary ───────────────────────────────────────────────────────────

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div style={{ color: "red", border: "1px solid red", padding: 8 }}>
          <p>Something went wrong:</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── BuggyCounter ────────────────────────────────────────────────────────────

class BuggyCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  }

  render() {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }
    return (
      <button onClick={this.handleClick} style={{ fontSize: 24, margin: 4 }}>
        {this.state.counter}
      </button>
    );
  }
}

// ─── Exercise 1 ──────────────────────────────────────────────────────────────

function Exercise1() {
  return (
    <div>
      <h2>Exercise 1: Error Boundary Simulation</h2>

      <h3>Simulation 1 — One boundary wraps both counters</h3>
      <p>If one crashes, the boundary replaces both.</p>
      <ErrorBoundary>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>

      <h3>Simulation 2 — Each counter has its own boundary</h3>
      <p>If one crashes, the other is not affected.</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>

      <h3>Simulation 3 — No boundary</h3>
      <p>When it crashes at 5, the whole page breaks.</p>
      <BuggyCounter />
    </div>
  );
}

// ─── Exercise 2 ──────────────────────────────────────────────────────────────

class FavoriteColor extends Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red" };
  }

  // Part I — change to false to block all re-renders
  shouldComponentUpdate() {
    return true;
  }

  // Part III — called just before the DOM updates
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate — prev color was:", prevState.favoriteColor);
    return null;
  }

  // Part II — called after the component is updated in the DOM
  componentDidUpdate() {
    console.log("after update — current color:", this.state.favoriteColor);
  }

  componentDidMount() {
    // Mounts with "red", then auto-changes to "yellow" after 1.5s
    this.timer = setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
      <div>
        <p>
          My favorite color is{" "}
          <span style={{ color: this.state.favoriteColor, fontWeight: "bold" }}>
            {this.state.favoriteColor}
          </span>
        </p>
        <button onClick={() => this.setState({ favoriteColor: "blue" })}>
          Change to blue
        </button>
      </div>
    );
  }
}

function Exercise2() {
  return (
    <div>
      <h2>Exercise 2: Lifecycle — Updating Phase</h2>
      <p>Opens with "red". After 1.5s it changes to "yellow". Open DevTools console to see lifecycle logs.</p>
      <FavoriteColor />
    </div>
  );
}

// ─── Exercise 3 ──────────────────────────────────────────────────────────────

class Child extends Component {
  componentWillUnmount() {
    alert("Child component unmounted!");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

class LifecycleApp extends Component {
  constructor(props) {
    super(props);
    this.state = { favoriteColor: "red", show: true };
    this.deleteChild = this.deleteChild.bind(this);
  }

  shouldComponentUpdate() {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate — prev color:", prevState.favoriteColor);
    return null;
  }

  componentDidUpdate() {
    console.log("after update");
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1500);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  deleteChild() {
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        <p>
          Favorite color:{" "}
          <span style={{ color: this.state.favoriteColor, fontWeight: "bold" }}>
            {this.state.favoriteColor}
          </span>
        </p>

        {this.state.show ? (
          <Child />
        ) : (
          <p style={{ color: "gray" }}>(Child has been unmounted)</p>
        )}

        <button onClick={this.deleteChild} disabled={!this.state.show}>
          Delete
        </button>
      </div>
    );
  }
}

function Exercise3() {
  return (
    <div>
      <h2>Exercise 3: Lifecycle — Unmounting Phase</h2>
      <p>Click Delete to unmount the Child. componentWillUnmount fires an alert.</p>
      <LifecycleApp />
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState(1);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 24 }}>
      <h1>React Lifecycle & Error Boundaries</h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => setTab(1)}>Exercise 1 — Error Boundaries</button>
        <button onClick={() => setTab(2)}>Exercise 2 — Updating</button>
        <button onClick={() => setTab(3)}>Exercise 3 — Unmounting</button>
      </div>

      {tab === 1 && <Exercise1 />}
      {tab === 2 && <Exercise2 />}
      {tab === 3 && <Exercise3 />}
    </div>
  );
}