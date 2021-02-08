const dataReducer = (state = { videos: [] }, action) => {
  console.log("Reducer - handling:", action.type)
  switch(action.type) {
    case 'PUT_VIDEOS':
      return putVideos(state, action.payload)
    case 'UPDATE_VIDEO':
      return updateVideo(state, action.payload)
    case 'PUT_VIDEO_ID':
      return updateVideoId(state, action.payload)
    default:
      return state
  }
}

const putVideos = (state, videos) => {
  console.log("Putting", videos)
  state.videos = videos
  return state
}

const updateVideo = (state, updatedVideo) => {
  console.log("Updating video", updatedVideo)
  state.videos[updatedVideo.id] = updatedVideo
  return state
}

const updateVideoId = (state, videoId) => {
  console.log("Updating videoId", videoId)
  state.videoId = videoId
  return state
}

export default dataReducer