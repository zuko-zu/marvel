import { Component } from "react"

import MarvelService from "../../services/MarvelService"
import Spinner from "../spinner/Spinner"
import ErrorMessage from "../errorMessage/ErrorMessage"
import Skeleton from "../skeleton/Skeleton"

import "./charInfo.scss"

class CharInfo extends Component {
  state = {
    character: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateCharacter()
  }

  componentDidUpdate(prevProps) {
    // Делаем проверку во избежание бесконечного цикла. Также не отправляем запрос при клике на одного и того же персонажа
    if (this.props.characterId !== prevProps.characterId) {
      this.updateCharacter()
    }
  }

  updateCharacter = () => {
    const { characterId } = this.props
    if (!characterId) {
      return
    }
    this.onCharacterLoading()
    this.marvelService
      .getCharacter(characterId)
      .then(this.onCharacterLoaded)
      .catch(this.onError)
  }

  onCharacterLoaded = (character) => {
    this.setState({ character, loading: false })
  }

  onCharacterLoading = () => {
    this.setState({ loading: true })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  render() {
    const { character, loading, error } = this.state

    const skeleton = character || loading || error ? null : <Skeleton />
    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error || !character) ? (
      <View character={character} />
    ) : null

    return (
      <div className='char__info'>
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const View = ({ character }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = character

  let imgStyle = { objectFit: "cover" }
  if (
    character.thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" }
  }

  return (
    <>
      <div className='char__basics'>
        <img
          src={thumbnail}
          alt={name}
          style={imgStyle}
        />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a
              href={homepage}
              className='button button__main'
            >
              <div className='inner'>homepage</div>
            </a>
            <a
              href={wiki}
              className='button button__secondary'
            >
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length
          ? comics.map((item, i) => {
              if (i > 9) return
              return (
                <li
                  key={i}
                  className='char__comics-item'
                >
                  {item.name}{" "}
                </li>
              )
            })
          : "There is no comics with this character"}
      </ul>
    </>
  )
}

export default CharInfo
