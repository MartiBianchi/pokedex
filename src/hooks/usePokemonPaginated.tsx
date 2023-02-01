import { useEffect, useRef, useState } from "react"
import { pokemonApi } from "../api/pokemonApi"

import { PokemonPaginatedResponse, Result, SimplePokemon } from "../interfaces/pokemonInterfaces"

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([])
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')
  
  const loadPokemons = async () => {

    // Fetch de datos
    const res = await pokemonApi.get<PokemonPaginatedResponse>( nextPageUrl.current )
    nextPageUrl.current = res.data.next

    mapPokemonList( res.data.results )
  }

  const mapPokemonList = ( pokemonList: Result[] ) => {

    const newPokemonList: SimplePokemon[] = pokemonList.map(({ name, url }) => {
      // Obtenemos los datos de cada pokemon por separado
      const urlParts = url.split('/')
      const id = urlParts[ urlParts.length - 2 ]
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${ id }.png`
      
      return { id, picture, name }
    })

    // Guardamos los pokemones obtenidos más los nuevos por obtener
    setSimplePokemonList([ ...simplePokemonList, ...newPokemonList ])
    setIsLoading(false)
  }

  useEffect(() => {
    loadPokemons();
  }, [])

  return { 
    isLoading, 
    simplePokemonList, 
    loadPokemons 
  }
}
