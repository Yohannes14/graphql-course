import React, { useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";

// GET ALL USERS
const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

/// GET ALL MOVIES
const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

///
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Data is Loading</h1>;
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Name.." />
        <input type="text" placeholder="Username.." />
        <input type="number" placeholder="Age.." />
        
        <input type="text" placeholder="Nationality.." />
        <button>Create User</button>
      </div>
      {data &&
        data?.users?.map((user) => {
          return (
            <div key={user.id}>
              <h1>Name: {user.name}</h1>
              <h1>User name: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData?.movies?.map((movie) => {
          return (
            <div key={movie.id}>
              <h1>Movie Name: {movie.name}</h1>
            </div>
          );
        })}
      <div>
        <input
          type="text"
          placeholder="Interstellar.."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          {" "}
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName:{movieSearchedData.movie.name}</h1>
              <h1>
                Year Of Publication:{movieSearchedData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1>There was an error fetching the data</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
