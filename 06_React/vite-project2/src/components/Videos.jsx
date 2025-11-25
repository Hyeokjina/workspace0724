import React from 'react'
import styled from 'styled-components'
import VideoCard from './VideoCard'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
`

function Videos({ videoList }) {
  return (
    <Container>
      {videoList.map((video, index) => (
        <VideoCard key={index} video={video} />
      ))}
    </Container>
  )
}

export default Videos