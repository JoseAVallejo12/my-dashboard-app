import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const DashboardPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(currentPage - 1) * 10}`);
        const data = await response.json();
        const pokemonsData = await Promise.all(data.results.map(async (pokemon: { name: string; url: string }) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
          };
        }));
        setPokemons(pokemonsData);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemons();
  }, [currentPage]);

  const handlePokemonClick = (pokemonId: number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <nav>
        <div>My Pokedex</div>
        <div>Avatar</div>
      </nav>
      <main>
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.id} onClick={() => handlePokemonClick(pokemon.id)}>
              <img src={pokemon.image} alt={pokemon.name} />
              <div>{pokemon.name}</div>
            </li>
          ))}
        </ul>
        <div>
          <button disabled={currentPage === 1} onClick={handlePrevClick}>Previous</button>
          <button disabled={currentPage === totalPages} onClick={handleNextClick}>Next</button>
        </div>
      </main>
    </div>
  );
};
