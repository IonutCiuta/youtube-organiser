export const putVideosAction = (videos) => {
  console.log("Storing videos", videos)
  return {
    type: "PUT_VIDEOS",
    payload: videos
  }
}
