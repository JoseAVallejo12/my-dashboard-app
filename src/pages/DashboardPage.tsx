import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPokemon, getPokemonById } from "../api/pokemon/pokemonService";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  weight: number;
  moves: any[];
  abilities: any[];
}

export const DashboardPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        let offset = (currentPage - 1) * 10;
        const data = await getPokemon(10, offset);

        const pokemonsData = await Promise.all(
          data.results.map(async (pokemon: { name: string; url: string }) => {
            const pokemonId = pokemon.url.split("/")[6];
            const pokemonData = await getPokemonById(pokemonId);
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              weight: pokemonData.weight,
              moves: pokemonData.moves,
              abilities: pokemonData.abilities,
            };
          })
        );

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

  const printPokemons = () => {
    console.log({ pokemons });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map((pokemon: Pokemon) => (
          <div
            key={pokemon.id}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <img
              className="w-full h-48 object-cover"
              src={pokemon.image}
              alt={pokemon.name}
            />
            <div className="px-4 py-2">
              <h3 className="text-gray-700 font-bold text-lg mb-2">
                {pokemon.name}
              </h3>
              <p className="text-gray-700 text-base">{pokemon.weight}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevClick}>
          Previous
        </button>
        <button disabled={currentPage === totalPages} onClick={handleNextClick}>
          Next
        </button>
      </div>
      <button onClick={printPokemons}>VER OBJETO</button>
    </div>
  );
};
