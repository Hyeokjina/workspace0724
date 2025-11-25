import styled from "styled-components";

export const Container = styled.div`
    width: 320px;
    background: #fff;
    cursor: pointer;
    
    &:hover {
        transform: scale(1.02);
        transition: 0.2s;
    }
`

export const Thumbnail = styled.img`
    width: 100%;
    height: 180px;
    border-radius: 12px;
`

export const InfoContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 12px;
`

export const Logo = styled.img`
    width: 36px;
    height: 36px;
    border-radius: 50%;
`

export const TextContainer = styled.div`
    flex: 1;
`

export const Title = styled.h3`
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: #0f0f0f;
    line-height: 1.4;
`

export const ChannelName = styled.p`
    margin: 4px 0;
    font-size: 12px;
    color: #606060;
`

export const VideoInfo = styled.p`
    margin: 0;
    font-size: 12px;
    color: #606060;
`