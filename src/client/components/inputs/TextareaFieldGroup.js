import React from 'react'
import PropTypes from 'prop-types'

const TextareaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) => {
  return (
    <div className="form-group">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-info">{info}</small>}
      {error && <div className="form-invalid">{error}</div>}
    </div>
  )
}

TextareaFieldGroup.propTypes = {
  error: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
}

export default TextareaFieldGroup
