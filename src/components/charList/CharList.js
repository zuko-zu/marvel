import { Component } from "react"

import MarvelService from "../../services/MarvelService"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import CharItem from "../charItem/CharItem"

import "./charList.scss"

class CharList extends Component {
  state = {
    characters: null,
    loading: true,
    error: false,
  }

  marvelService = new MarvelService()

  onCharactersLoaded = (characters) => {
    console.log(characters)
    this.setState({
      characters,
      loading: false,
    })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  componentDidMount() {
    this.marvelService.getAllCharacters().then(this.onCharactersLoaded)
  }

  render() {
    const { characters, loading, error } = this.state

    const elements =
      characters &&
      characters.map((character, index) => {
        return (
          <CharItem
            name={character.name}
            thumbnail={character.thumbnail}
            key={index}
          />
        )
      })

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || errorMessage) ? elements : null
    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        <ul className='char__grid'>{content}</ul>
        <button className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
