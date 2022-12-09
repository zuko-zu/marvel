function charItem({ name, thumbnail, style }) {
  return (
    <li className='char__item'>
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
