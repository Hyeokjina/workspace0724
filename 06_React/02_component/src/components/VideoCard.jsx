import React from 'react'
import { 
  Container, 
  Thumbnail, 
  InfoContainer, 
  Logo, 
  TextContainer, 
  Title, 
  ChannelName, 
  VideoInfo 
} from './VideoCard.styled'

function VideoCard({ video }) {
  return (
    <Container>
      <Thumbnail src={video.sumbnail} alt={video.title} />
      <InfoContainer>
        <Logo src={video.logo} alt={video.channelName} />
        <TextContainer>
          <Title>{video.title}</Title>
          <ChannelName>{video.channelName}</ChannelName>
          <VideoInfo>조회수 {video.views} • {video.date}</VideoInfo>
        </TextContainer>
      </InfoContainer>
    </Container>
  )
}

export default VideoCard