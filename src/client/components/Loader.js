import React from 'react'
import { BounceLoader } from 'react-spinners'

const styles = {
  display: 'block',
  margin: 'auto'
}
const Loader = () => (
  <BounceLoader size={100} style={styles} />
)

export default Loader
