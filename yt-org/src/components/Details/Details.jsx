function Details(props) {
  const videoId = props.match.params.id

  const getIframeSrc = () => {
    return "https://www.youtube.com/embed/" + videoId + "?autoplay=1&origin=http://example.com"
  }

  return  (
    <div>
      <h3>Video id: {videoId}</h3>
      <iframe
        id="ytplayer"
        type="text/html"
        width="640" height="360"
        src={getIframeSrc()}
        frameborder="0">
      </iframe>
    </div>
  );
}

export default Details;