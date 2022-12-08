function charItem({ name, thumbnail }) {
  return (
    <li className='char__item'>
      <img
        src={thumbnail}
        alt={name}
      />
      <div className='char__name'>{name}</div>
    </li>
  )
}

export default charItem
