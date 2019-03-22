import React from "react";

const ListGroup = ({
  genres,
  textProperty,
  valueProperty,
  selectedGenre,
  onFilterChange
}) => {
  return (
    <ul className="list-group">
      {genres.map(genre => (
        <li
          key={genre[valueProperty]}
          className={
            genre[textProperty] === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          style={{ cursor: "pointer" }}
          onClick={() => onFilterChange(genre.name)}
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
