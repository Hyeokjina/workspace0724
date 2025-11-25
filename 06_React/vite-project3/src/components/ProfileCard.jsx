import React from 'react'
import styled from 'styled-components';

const Profile = styled.div`
  border: 1px solid black;
  background-color: #d4c8c877;
  padding: 10px;
  margin: 10px;
`
const State = styled.p`
  color: ${props => props.isOnline ? 'green':'red'};
`

const ProfileCard = (props) => {
    const profile = props.profile;
  return (
    <Profile>
       <p>이름 : {profile.name}</p>
       <p>나이 : {profile.age}</p>
       <State isOnline={profile.isOnline}>
       온라인 여부 : {profile.isOnline ? "🟢 온라인 상태입니다." : "🔴 오프라인 상태입니다."}
       </State>
    </Profile>
  )
}

export default ProfileCard