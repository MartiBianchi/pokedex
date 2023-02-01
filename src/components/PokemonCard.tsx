import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ImageColors from 'react-native-image-colors'

import { SimplePokemon } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'

const windowWidth = Dimensions.get('window').width

interface Props {
  pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {

  const [bgcolor, setBgcolor] = useState('grey')
  const isMounted = useRef(true)
  const navigation = useNavigation()

  useEffect(() => {

    ImageColors.getColors(pokemon.picture, { fallback: 'grey' })
      .then( colors => {
        // Evitar cambio de estado cuando el componente
        // se encuentra desmontado
        if ( !isMounted.current ) return

        ( colors.platform  === 'android' )
          ? setBgcolor( colors.muted || 'grey' )
          : setBgcolor( colors.platform || 'grey' )      
      })

      // Se ejecuta cuando el componente se desmonta
      return () => {
        isMounted.current = false
      }

  }, [])

  return (
    <TouchableOpacity
      activeOpacity={ 0.9 }
      onPress={() => navigation.navigate('PokemonScreen' as never, { 
        simplePokemon: pokemon,
        color: bgcolor
      } as never
      )}
    >
      <View style={{
        ...styles.cardContainer,
        width: windowWidth * 0.4,
        backgroundColor: bgcolor
      }}>
        {/* Nombre e ID del pokemon */}
        <View>
          <Text style={ styles.name }>
            { pokemon.name }
            { '\n#' + pokemon.id }
          </Text>
        </View>

        <View style={ styles.pokebolaContainer }> 
          <Image 
            source={ require('../assets/pokebola-blanca.png') }
            style={ styles.pokebola }
          />
        </View>

        <FadeInImage 
          uri={ pokemon.picture }
          style={ styles.pokemonImage }
        />

      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    
    elevation: 10,    
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5
  }
})
