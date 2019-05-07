import React, { Component } from "react";
import { toast } from "react-toastify";
import "../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import SearchBox from "./searchBox";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGenre: "All Genres",
    searchQuery: "",
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    var genres = await getGenres();
    const movies = await getMovies();

    genres = [{ _id: "", name: "All Genres" }, ...genres];

    this.setState({ movies, genres });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page }); //every time we change this value, the page is re-rendered
  };

  handleFilterChange = async genre => {
    var movies = await getMovies();

    if (genre === "All Genres") {
      this.setState({ selectedGenre: genre, movies });
    } else {
      movies = movies.filter(c => c.genre.name === genre);
      this.setState({
        currentPage: 1,
        selectedGenre: genre,
        movies,
        searchQuery: ""
      });
    }
  };

  handleSearch = async query => {
    var { selectedGenre } = this.state;

    const pattern = new RegExp("^" + query, "gmi");
    var movies = await getMovies();

    movies = movies.filter(movie => movie.title.match(pattern));
    query === "" ? (selectedGenre = "All Genres") : (selectedGenre = null);

    this.setState({
      movies,
      searchQuery: query,
      selectedGenre,
      currentPage: 1
    });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handleDelete = async movie => {
    const originalMovies = this.state.movies;

    const movies = this.state.movies.filter(c => c._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already been deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn }); //every time we change this value, the page is re-rendered
  };

  countMovies() {
    const numMovies = this.state.movies.length;
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
      genres,
      searchQuery
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
        <div className="row">
          <div className="col-3">
            <ListGroup
              genres={genres}
              selectedGenre={selectedGenre}
              onFilterChange={this.handleFilterChange}
            />
          </div>
          <div className="col">
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ maginBotton: 10 }}
            >
              New Movie
            </Link>

            <h4>{this.countMovies()}</h4>

            <SearchBox value={searchQuery} onChange={this.handleSearch} />

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
