import React from 'react'
import PropTypes from 'prop-types'

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange
}) => {
  return (
    <div className="form-group">
      <input
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="form-invalid">{error}</div>}
    </div>
  )
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

InputGroup.defaultProps = {
  type: 'text'
}

export default InputGroup
