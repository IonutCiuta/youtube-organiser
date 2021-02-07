import { Card } from 'react-bootstrap';
import moment from 'moment';

const parseDate = (date) => {
  return moment(date).format("DD MMMM yyyy")
}

const getVideoUrl = (id) => {
  return "/details/" + id
}

const YTVideo = (props) => {
  const video = props.video

  return (
    <Card style={{ width: '30rem', margin: '1rem 0rem' }}>
      <Card.Img variant="top" src={video.cover}/>
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{parseDate(video.date)}</Card.Subtitle>
        <Card.Link href={getVideoUrl(video.url)}>Watch</Card.Link>
      </Card.Body>
    </Card>
  );
}

export default YTVideo;