import React from "react"
import ContentLoader from "react-content-loader"

const GenrePreLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={170}
    height={50}
    viewBox="0 0 180 55"
    backgroundColor="#212223"
    foregroundColor="#14161a"
    {...props}
  >
    <rect x="45" y="20" rx="3" ry="3" width="88" height="22" /> 
    <rect x="11" y="13" rx="5" ry="5" width="28" height="34" /> 
    <rect x="31" y="33" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default GenrePreLoader