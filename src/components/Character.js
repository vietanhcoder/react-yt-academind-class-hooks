import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = (props) => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    // console.log(
    //   "Sending Http request for new character with id " + props.selectedChar
    // );
    setIsLoading(true);
    fetch("http://localhost:4000/people/" + props.selectedChar)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then((charData) => {
        // console.log(charData);
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color,
          },
          gender: charData.gender,
          movieCount: charData.films.length,
        };
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    return () => {
      console.log('Cleaning up....')
    };
  }, [props.selectedChar]);

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default Character;
