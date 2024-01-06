import React from "react"
import ContentLoader from "react-content-loader"

const ImgPreLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={475}
    height={300}
    viewBox="0 0 475 300"
    backgroundColor="#212223"
    foregroundColor="#14161a"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="174" height="290" /> 
    <rect x="0" y="0" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
)

export default ImgPreLoader