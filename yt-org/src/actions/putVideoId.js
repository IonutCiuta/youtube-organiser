export const putVideoIdAction = (videoId) => {
  console.log("Storing video ID", videoId)
  return {
    type: "PUT_VIDEO_ID",
    payload: videoId
  }
}