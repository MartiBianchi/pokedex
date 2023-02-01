import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PokemonFull } from '../interfaces/pokemonInterfaces'
import { FadeInImage } from './FadeInImage'

interface Props {
  pokemon: PokemonFull
}

export const PokemonDetail = ({ pokemon }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={ false }
      style={{
        ...StyleSheet.absoluteFillObject
      }}
    >
      {/*  Types & Weigth */}
      <View
        style={{
          ...styles.container,
          marginTop: 470
        }}
      >
        {/* Types */}
        <Text style={ styles.title }>Types</Text>
        <View style={{ flexDirection: 'row' }}>
          {
            pokemon.types.map(({ type }) => (
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
                key={ type.name }
              >
                { type.name }
              </Text>
            ))
          }
        </View>

        {/* Weigth */}
        <Text style={ styles.title }>Weight</Text>
        <Text style={ styles.regularText }>{ pokemon.weight }kg</Text>
      </View>

      {/* Sprites */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Sprites</Text>
      </View>

      <ScrollView horizontal>
          <FadeInImage 
            uri={ pokemon.sprites.front_default }
            style={ styles.basicSprite }
          />
          <FadeInImage 
            uri={ pokemon.sprites.back_default }
            style={ styles.basicSprite }
          />
          <FadeInImage 
            uri={ pokemon.sprites.front_shiny }
            style={ styles.basicSprite }
          />
          <FadeInImage 
            uri={ pokemon.sprites.back_shiny }
            style={ styles.basicSprite }
          />
      </ScrollView>

      {/* base skills */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Base Skills</Text>
          {
            pokemon.abilities.map(({ ability }) => (
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
                key={ ability.name }
              >
                { ability.name }
              </Text>
            ))
          }
      </View>

      {/* Some moves */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Some Moves</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            pokemon.moves.slice(0 , 10).map(({ move }) => (
              <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
                key={ move.name }
              >
                { move.name }
              </Text>
            ))
          }
        </View>
      </View>

      {/* Stats */}
      <View style={ styles.container }>
        <Text style={ styles.title }>Stats</Text>
        <View>
          {
            pokemon.stats.map(( stat, i ) => (
              <View
                key={ stat.stat.name + i }
                style={{ flexDirection: 'row', justifyContent: 'space-between'}}
              >
                <Text
                style={{
                  ...styles.regularText,
                  marginRight: 10
                }}
              >
                { stat.stat.name }
              </Text>

              <Text
                style={{
                  ...styles.regularText,
                  fontWeight: 'bold'
                }}
              >
                { stat.base_stat }
              </Text>
              </View>
            ))
          }
        </View>

        {/* Sprite final */}
        <View style={{
          marginBottom: 20,
          alignItems: 'center'
        }}>
          <FadeInImage 
            uri={ pokemon.sprites.front_default }
            style={ styles.basicSprite }
          />
        </View>

      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black'
  },
  regularText: {
    fontSize: 18,
    color: 'black'
  },
  basicSprite: {
    width: 100,
    height: 100
  }
})