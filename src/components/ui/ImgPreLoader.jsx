import React from "react"
import ContentLoader from "react-content-loader"

const ImgPreLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={'100%'}
    height={'100%'}
    backgroundColor="#212223"
    foregroundColor="#14161a"
    {...props}
  >
    <rect x="0" y="0" rx="8" ry="8" width='100%' height="100%" /> 
    <rect x="0" y="0" rx="0" ry="0" width="1" height="1000" />
  </ContentLoader>
)

export default ImgPreLoader