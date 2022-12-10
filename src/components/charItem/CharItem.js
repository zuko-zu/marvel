function charItem({ name, thumbnail, style, onCharacterSelected, id }) {
  return (
    <li
      className='char__item'
      onClick={() => onCharacterSelected(id)}
    >
      <img
        src={thumbnail}
        alt={name}
        style={style}
      />
      <div className='char__name'>{name}</div>
    </li>
  )
}

export default charItem
