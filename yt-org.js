const { fdatasync } = require('fs')

const fs = require('fs');
const { exit } = require('process');
const axios = require('axios').default;

const api = "https://youtube.googleapis.com/youtube/v3/"
const resource = "playlistItems"
const q = "?playlistId={PLAYLIST_ID}&key={KEY}&part=snippet"

let query = q
  .replace("{PLAYLIST_ID}", "UUbvKamSrJkwT6ed2BMMZXwg")
  .replace("{KEY}", "AIzaSyDrj5CwS27FE_8j1q8j2z2PBd6y184ZqFU")

let url = api + resource + query

let videos = []

function getPage(pageToken, attempt) {
  if(attempt > 3) {
    console.error("Max attempts reached. Stopping.")
    return
  }

  if(!attempt) {
    attempt = 0
  }

  if(pageToken == -1) {
    console.log("Read all pages. Stopping.")
    return
  }

  if(!pageToken) {
    pageToken = ""
  }

  console.log("Requesting\n\tpage: " + (pageToken ? pageToken : "first" + "\n\tattempt: " + attempt))

  axios.get(url + "&pageToken=" + pageToken + "maxResults=50")
    .then(function (response) {
      let data = response.data
      parseVideos(data)
      pageToken = getNextPage(data)
    })
    .catch(function (error) {
        console.error("Request failed\n\terror: " + error)
        attempt += 1
    })
    .then(function () {
      getPage(pageToken, attempt)
    });
}

function getNextPage(data) {
  let nextPage = data.nextPageToken
  return nextPage ? nextPage : -1
}

function parseVideos(data) {
  data.items.array.forEach(video => {
    videos.push({
      title: video.title,
      data: video.publishedAt,
      id: video.publishedAt.videoId,
      cover: video.thumbnails.standard.url
    })
  });
}

getPage()

console.log(videos.size)
console.log(videos)