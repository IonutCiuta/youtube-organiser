const dataReducer = (state = { videos: [] }, action) => {
  console.log("Reducer - handling:", action.type)
  switch(action.type) {
    case 'PUT_VIDEOS':
      return putVideos(state, action.payload)
    case 'UPDATE_VIDEO':
      return updateVideo(state, action.payload)
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
  console.log("Updating", updatedVideo)
  state.videos[updatedVideo.id] = updatedVideo
  return state
}

export default dataReducer