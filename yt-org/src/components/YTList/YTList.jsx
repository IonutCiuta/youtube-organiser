import { connect, useSelector } from 'react-redux'
import YTVideo from '../YTVideo/YTVideo'

const getVideos = state => {
  let videos = []
  for(let value of state.videos.values()) {
    videos.push(value)
  }
  return videos
}

const YTList = () => {
  const videos = useSelector(getVideos)

  return (
    <div>
      {
        videos
        && videos.length > 0
        && videos.map(v => <YTVideo video={v} key={v.url}></YTVideo>)
      } 
    </div>
  )
}

export default connect()(YTList);