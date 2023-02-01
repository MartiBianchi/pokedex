import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { usePokemonSearch } from '../hooks/usePokemonSearch'
import { Loading } from '../components/Loading'
import { PokemonCard } from '../components/PokemonCard'
import { SearchInput } from '../components/SearchInput'
import { styles } from '../theme/appTheme'
import { SimplePokemon } from '../interfaces/pokemonInterfaces'

const screenWidth = Dimensions.get('window').width

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets()
  const { isFetching, simplePokemonList}  = usePokemonSearch()

  const [searchTerm, setSearchTerm] = useState('')
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([])

  useEffect(() => {
    
    if ( searchTerm.length === 0 ) {
      return setPokemonFiltered([])
    }

    if ( isNaN( Number(searchTerm))) {
      // Busqueda por nombre
      setPokemonFiltered(
        simplePokemonList.filter( 
          (poke) => poke.name.toLowerCase().includes( searchTerm.toLowerCase() )
        )
      )
    } else {
      // Busqueda por ID
      const pokemonById = simplePokemonList.find(poke => poke.id === searchTerm)
      // Verificar que devuelva un array
      setPokemonFiltered(
        (pokemonById) ? [ pokemonById ] : []
      )
    } 


  }, [searchTerm])
  

  if ( isFetching ) {
    return <Loading />
  }

  return (
    <View style={{ 
      flex: 1,
      marginHorizontal: 20
    }}>
      <SearchInput 
        onDebounce={ (value) => setSearchTerm(value) }
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: (Platform.OS === 'android') ? top + 20 : top
        }}
      />

      <FlatList 
        data={ pokemonFiltered }
        keyExtractor={ (pokemon) => pokemon.id }
        showsVerticalScrollIndicator={false}
        numColumns={ 2 }

        // Header
        ListHeaderComponent={(
          <Text style={{
            ...styles.title,
            padding: 10,
            marginLeft: 0,
            marginTop: (Platform.OS === 'android') ? top + 80 : top + 60
          }}>
            { searchTerm }
          </Text>
        )}

        renderItem={ ({ item: pokemon }) => ( <PokemonCard pokemon={ pokemon } />)}
      />
    </View>
  )
}
