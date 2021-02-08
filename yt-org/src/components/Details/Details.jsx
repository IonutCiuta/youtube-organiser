import { connect, useSelector } from 'react-redux'
import { useEffect } from 'react';
import store from '../../store/store.js'
import { putVideoIdAction } from '../../actions/putVideoId.js'

const getVideos = state => state.videos

const Details = (props) => {
  const videoId = props.match.params.id
  const videos = useSelector(getVideos)
  const video = videos.get(videoId)

  const getIframeSrc = () => {
    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1&origin=http://example.com"
  }

  if(true) {
    return  (
      <div>
        <h3>{video.title}</h3>
        <iframe
          title="ytplayer"
          id="ytplayer"
          type="text/html"
          width="640" height="360"
          src={getIframeSrc()}
          frameBorder="0">
        </iframe>
      </div>
    )
  } else {
    return <h2>Error</h2>
  }
}

export default connect()(Details);