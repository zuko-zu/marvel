import { Component } from "react"

import MarvelService from "../../services/MarvelService"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import CharItem from "../charItem/CharItem"

import "./charList.scss"

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
  }

  marvelService = new MarvelService()

  onCharactersLoaded = (characters) => {
    this.setState({
      characters,
      loading: false,
    })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharactersLoaded)
      .catch(this.onError)
  }

  // Метод нужен для оптимизации, чтобы не помещать такую конструкцию в метод render
  renderItems(arr) {
    const items = arr.map((item) => {
      // Исправляем баг с обрезанием картинки
      let imgStyle = { objectFit: "cover" }
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" }
      }

      return (
        <CharItem
          name={item.name}
          thumbnail={item.thumbnail}
          style={imgStyle}
          key={item.id}
        />
      )
    })

    // Выносим эту конструкцию в функцию для корректного центрирования
    return <ul className='char__grid'>{items}</ul>
  }

  render() {
    const { characters, loading, error } = this.state

    const items = this.renderItems(characters)

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? items : null
    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button className='button button__main button__long'>
          <div className='inner'>load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
