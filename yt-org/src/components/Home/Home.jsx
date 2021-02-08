import { connect } from 'react-redux'
import { useEffect } from 'react';
import YTList from '../YTList/YTList'
import { putVideosAction } from '../../actions/putVideos.js'
import store from '../../store/store.js'

const getVideos = () => {
  fetch('videos.json', {
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }).then(response => {
    return response.json();
  }).then(jsonData => {
    let idToVideoMap = new Map()
    jsonData.forEach(video => {
      idToVideoMap.set(video.url, video)
    });
    store.dispatch(putVideosAction(idToVideoMap));
  })
}

const Home = () => {
  useEffect(() => {
    getVideos()
  }, [])

  return (
    <YTList></YTList>
  );
}

export default connect()(Home);
