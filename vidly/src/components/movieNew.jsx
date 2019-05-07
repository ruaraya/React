import React from "react";
import Form from "./common/form";
import { getMovie, saveMovie, updateMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import Joi from "joi-browser";
import _ from "lodash";

class MovieNew extends Form {
  state = {
    data: { _id: "", title: "", genre: "", stock: "", rate: "" },
    genres: [],
    errors: {}
  };

  async componentDidMount() {
    this.populateGenre();
    this.populateMovie();
  }

  async populateGenre() {
    var genres = await getGenres();
    genres = [{ _id: "", name: "" }, ...genres];

    this.setState({ genres });
  }

  async populateMovie() {
    const id = this.props.match.params.id;

    if (id) {
      try {
        const movie = await getMovie(id);

        let newMovie = {};

        newMovie._id = movie._id;
        newMovie.title = movie.title;
        newMovie.stock = movie.numberInStock;
        newMovie.genre = _.get(movie, "genre._id");
        newMovie.rate = movie.dailyRentalRate;

        this.setState({
          data: newMovie
        });
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          this.props.history.replace("/not-found");
        }
      }
    }
  }

  schema = {
    _id: Joi.string().allow(""),

    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    stock: Joi.number()
      .min(1)
      .max(100)
      .label("Stock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .label("Rate")
  };

  doCreateMovie = async () => {
    const { _id, title, genre, stock, rate } = this.state.data;
    const newMovie = {};

    newMovie.title = title;
    newMovie.numberInStock = stock;
    newMovie.genreId = genre;
    newMovie.dailyRentalRate = rate;

    if (!_id) {
      await saveMovie(newMovie);
      this.props.history.push("/movies");
    } else {
      await updateMovie(_id, newMovie);
      this.props.history.push("/movies");
    }
  };

  render() {
    const { genres } = this.state;
    const { id } = this.props.match.params;

    return (
      <div>
        <h1>{!id ? "New movie" : "Modify movie"}</h1>
        <form onSubmit={this.handleNewMovie}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres, this.state.data.genre)}
          {this.renderInput("stock", "Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieNew;
