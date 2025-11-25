import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Head from './components/Head'
import Videos from './components/Videos'


const videoList = [{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
}
,{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/v54cAZR6Gmg/mqdefault_6s.webp?du=3000&sqp=CNDxk8kG&rs=AOn4CLCqap_h8_AAVjR_RARQliDopsUA0A",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
},{
  title: "빵빵이와 옥지의 일상",
  channelName: "빵빵이의 일상",
  sumbnail: "https://i.ytimg.com/an_webp/PbLxIaXRtnc/mqdefault_6s.webp?du=3000&sqp=CNjtk8kG&rs=AOn4CLBV6yt90L6RYBkRZhZn6YoeIERKtQ",
  logo: "https://yt3.googleusercontent.com/wYRkjS6E0mMZ-np2jNwjVaCNzQMpxs1VkdQ_p25oe0aaSj0awd7f9xRUcrwI6rVOQE7kjZQ6l4A=s120-c-k-c0x00ffffff-no-rj",
  views: "8.3만",
  date: "1개월전",
}]

function App() {
 
  return (
    <>
      {/* <Hello />
      <Hello />
      <Hello />
      <Hello /> */}
      {/* <Head type="h2" /> */}
      {/* <Head>
        <h3>무엇을 도와드릴까요?</h3>
      </Head> */}
      <Videos videoList={videoList}></Videos>
    </>
     
  )
}

export default App
