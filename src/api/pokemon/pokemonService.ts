import httpRequest from "../client";

const getPokemon = async (limit: number, offset: number) => {
  const response = await httpRequest.get("pokemon", {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};

const getPokemonById = async (id: string) => {
  const response = await httpRequest.get("pokemon/" + id);
  return response.data;
};

export { getPokemon, getPokemonById };
