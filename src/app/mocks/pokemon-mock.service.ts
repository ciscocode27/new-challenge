export class PokemonMockService {
    async getPokemonsByAuthor() {
      return (
        [
            {
               "id":372,
               "name":"Alakazam",
               "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/065.png",
               "attack":100,
               "defense":64,
               "hp":100,
               "type":"psychic",
               "id_author":1
            },
            {
               "id":426,
               "name":"Mewtwo",
               "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full/150_f3.png",
               "attack":100,
               "defense":100,
               "hp":100,
               "type":"Legendario",
               "id_author":1
            },
            {
               "id":473,
               "name":"Blastoise",
               "image":"https://assets.pokemon.com/assets/cms2/img/pokedex/full//009.png",
               "attack":44,
               "defense":36,
               "hp":22,
               "type":"Agua",
               "id_author":1
            }
         ]
      );
    };

    async deletePokemon(index: number) {
        return true;
      }

  }
  