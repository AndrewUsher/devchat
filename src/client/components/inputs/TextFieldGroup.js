import React from 'react'
import PropTypes from 'prop-types'

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <div className="form-info">{info}</div>}
      {error && <div className="form-invalid">{error}</div>}
    </div>
  )
}

TextFieldGroup.defaultProps = {
  type: 'text'
}

TextFieldGroup.propTypes = {
  disabled: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default TextFieldGroup
