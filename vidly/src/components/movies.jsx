import React, { Component } from "react";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";

class Movies extends Component {
  state = {
    allMovies: [],
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGenre: "All Genres",
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), allMovies: getMovies(), genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFilterChange = genre => {
    if (genre === "All Genres") {
      this.setState({ selectedGenre: genre, movies: this.state.allMovies });
    } else {
      const movies = this.state.allMovies.filter(c => c.genre.name === genre);
      this.setState({ currentPage: 1, selectedGenre: genre, movies });
    }
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    const allMovies = this.state.allMovies.filter(c => c._id !== movie._id);
    const movies = this.state.movies.filter(c => c._id !== movie._id);
    this.setState({ allMovies, movies });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  countMovies() {
    const numMovies = this.state.allMovies.length;
    if (numMovies > 0) {
      return "Showing " + numMovies + " movies in the database";
    } else {
      return "No movies in the database";
    }
  }

  render() {
    const {
      currentPage,
      pageSize,
      sortColumn,
      selectedGenre,
      genres
    } = this.state;
    const count = this.state.movies.length;

    const sorted = _.orderBy(
      this.state.movies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <main className="container">
        <h4>{this.countMovies()}</h4>
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              selectedGenre={selectedGenre}
              onFilterChange={this.handleFilterChange}
            />
          </div>
          <div className="col">
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
