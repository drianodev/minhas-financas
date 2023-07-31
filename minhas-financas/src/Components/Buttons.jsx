import { Link } from "react-router-dom"

function Buttons({ type = 'button', desc, onClick, classe, link = false, linkTo, disabled = false }) {

  const button = link ?

    <Link to={linkTo}>
      <button
        disabled={disabled}
        onClick={onClick}
        type={type}
        className={`btn btn-${classe}`}
      >{desc}</button></Link>

    : <button

      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`btn btn-${classe}`}
    >{desc}</button>

  return (
    button
  );
}

export default Buttons;