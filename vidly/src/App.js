import React, { Component } from "react";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <table />
      </main>
    );
  }
}

export default App;
