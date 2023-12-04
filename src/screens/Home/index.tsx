import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { HomeStackParamList } from '../../navigators/HomeStack';
import axios from 'axios';

const Home = () => {
  const {replace} = useNavigation<StackNavigationProp<HomeStackParamList>>()
  const [verse, setVerse] = useState({
    name: '',
    chapter: '',
    number: '',
    text: '',
  })

  const getVerse = async () => {
    try {
      const {data} = await axios.get('https://www.abibliadigital.com.br/api/verses/nvi/random')
      setVerse({
        name: data?.book?.name,
        chapter: data?.chapter,
        number: data?.number,
        text: data?.text,
      })
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getVerse()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <View style={style.container}>
      <Text style={style.title}>Diocese de Santos</Text>
      <Image style={{marginBottom: 40}} source={require('../../assets/logo.png')} />
      <Text style={style.verseText}>{verse.text}</Text>
      <Text style={style.verseInfo}>{`${verse.name} ${verse.chapter}:${verse.number}`}</Text>
      <TouchableOpacity style={style.button} onPress={() => replace('Tabs')}>
        <Text style={style.btnText}>Começar</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 5,
    height: 35,
    width: 150,
    backgroundColor: '#3366CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  buttonSecondary: {
    marginTop: 10,
    marginBottom: 5,
    height: 35,
    width: 150,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3366CC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnText: {
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10
  },
  btnTextSecondary: {
    color: '#3366CC',
    fontSize: 20,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 40,
    paddingBottom: 40
  },
  verseText: {
    marginHorizontal: 35,
    textAlign: 'center'
  },
  verseInfo: {
    fontWeight: 'bold'
  }
})

export default Home