const { fdatasync } = require('fs')

const fs = require('fs');
const { exit } = require('process');
const axios = require('axios').default;

const api = "https://youtube.googleapis.com/youtube/v3/"
const resource = "playlistItems"
const q = "?playlistId={PLAYLIST_ID}&key={KEY}&part=snippet"

let query = q
  .replace("{PLAYLIST_ID}", "UUbvKamSrJkwT6ed2BMMZXwg")
  .replace("{KEY}", "")

let url = api + resource + query

function getPage(pageToken, attempt, videos, success) {
  if(attempt > 3) {
    console.error("Max attempts reached. Stopping.")
    return
  }

  if(!attempt) {
    attempt = 0
  }

  if(pageToken == -1) {
    console.log("Read all pages. Stopping.")
    success(videos)
    return
  }

  if(!pageToken) {
    pageToken = ""
  }

  let nextUrl = url + "&pageToken=" + pageToken + "&maxResults=50"
  console.log("Requesting\n\tpage: " + (pageToken ? pageToken : "first") + "\n\tattempt: " + attempt + "\n\tfrom: " + nextUrl)

  axios.get(nextUrl)
    .then(function (response) {
      let data = response.data
      parseVideos(data, videos)
      pageToken = getNextPage(data)
    })
    .catch(function (error) {
        console.error("Request failed\n\terror: " + error)
        attempt += 1
    })
    .then(function () {
      getPage(pageToken, attempt, videos, success)
    });
}

function getNextPage(data) {
  let nextPage = data.nextPageToken
  return nextPage ? nextPage : -1
}

function parseVideos(data, videos) {
  data.items.forEach(video => {
    videos.push({
      title: video.snippet.title,
      desc: video.snippet.description,
      data: video.snippet.publishedAt,
      id: video.snippet.resourceId.videoId,
      cover: video.snippet.thumbnails.default.url
    })
  });
}

function getAllVideos() {
  let videos = []
  getPage("", 0, videos, (result) => {
    console.log(result.length)
    fs.writeFile("out.json", JSON.stringify(result), () => {
      console.log("Writing done.")
    })
  })
}

// Get all videos for channel
// getAllVideos()

fs.readFile("out.json", (err, data) => {
  if(data) {
    let filtered = JSON.parse(data).filter(video => {
        return filterByTitle("Banii în mișcare", video)
          || filterByDesc("Banii în mișcare", video)
          || filterByDesc("#BaniiÎnMișcare", video)
    }).sort((v1, v2) => new Date(v1.data) < new Date(v2.data))  
    console.log(filtered)
    console.log(filtered.length)
  } else {
    console.error(err)
  }
})

const filterByTitle = (tag, video) => video.title.toLowerCase().includes(tag.toLowerCase())

const filterByDesc = (tag, video) => video.desc.toLowerCase().includes(tag.toLowerCase())