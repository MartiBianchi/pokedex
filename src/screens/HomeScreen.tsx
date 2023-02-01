import React from 'react'
import { Image, FlatList, ActivityIndicator, View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { usePokemonPaginated } from '../hooks/usePokemonPaginated'
import { PokemonCard } from '../components/PokemonCard'
import { styles } from '../theme/appTheme'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets()
  const { simplePokemonList, loadPokemons } = usePokemonPaginated()

  return (
    <View>
      <Image
        source={ require('../assets/pokebola.png') }
        style={ styles.pokebolaBG }
      />

      <View 
        style={{ alignItems: 'center' }}
      >
        <FlatList 
          data={ simplePokemonList }
          keyExtractor={ (pokemon) => pokemon.id }
          showsVerticalScrollIndicator={false}
          numColumns={ 2 }

          // Header
          ListHeaderComponent={(
            <Text style={{
              ...styles.title,
              top: top + 20,
              marginBottom: top + 20,
              padding: 10,
              marginLeft: 0
            }}>
              Pokedex
            </Text>
          )}

          renderItem={ ({ item: pokemon }) => ( <PokemonCard pokemon={ pokemon } />)}

          // Infinite Scroll
          onEndReached={ loadPokemons }
          onEndReachedThreshold={ 0.5 }

          // Loading 
          ListFooterComponent={( 
            <ActivityIndicator 
              style={{ height: 100 }} 
              size={ 40 }
              color='grey'
            /> 
          )}
        />
      </View>

    </View>
  )
}
