import React, { useState, useEffect } from "react"
import { useCookies } from 'react-cookie'
import YouTube from 'react-youtube';
import { Accordion, Card, Button } from 'react-bootstrap'
import { apiUrl } from '../config'

const UserProfile = ({ match }) => {

    const [cookies] = useCookies(['erudite'])
    const [videos, setVideos] = useState([]);
    const username = match.params.username

    const ytOpts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    }

    const getVideoId = (url) => {
        var video_id = url.split('v=')[1];

        if (video_id) {
            return video_id
        }

        else return null
    }

    useEffect(() => {

        fetch(
            `${apiUrl}/answers/${username}`
        )
            .then(res => res.json())
            .then(response => {
                setVideos(response);
            })
            .catch(error => console.log(error));
    }, []);

    const _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    const deleteAnswer = (vidId) => {

        const token = cookies.erudite.token
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`)

        const requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders
        }

        fetch(`${apiUrl}/answer/${vidId}`, requestOptions)
            .then(resp => {
                // console.log({ resp })
                resp.json()
            })
            .then(json => {
                // alert(json)
                console.log({ json })
                // if status equals something, then remove the element from DOM
                // alert a successfull delete
                if (json.deletedCount > 0) {
                    alert('successfully removed!')
                } else { alert('failed to remove') }
            })
            .catch(err => console.log({ err }))
    }

    return (
        <div>
            <h1>{username}'s answers</h1>

            {/* formed response */}
            {videos.map((video, index) => {
                console.log(video.answers)
                return (
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="text" eventKey="0">
                                    {video.question.text}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {video.answers.map(vid => {
                                        return (
                                            <div>
                                                <p>{new Date(vid.dateAdded).toLocaleDateString("en-US")}</p>
                                                <YouTube
                                                    videoId={getVideoId(vid.url)}
                                                    opts={ytOpts}
                                                    onReady={_onReady}
                                                />
                                                <button
                                                    onClick={() => deleteAnswer(vid._id)}
                                                >
                                                    Remove
                                                </button>
                                                <p>some other meta data about video (score? user comments?)</p>
                                            </div>
                                        )
                                    })}
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )
            })}

            {/* non formed response */}
            {/* {videos.map((video, index) => {
                return (
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="text" eventKey="0">
                                    {video.question.text}
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <YouTube
                                        videoId={getVideoId(video.url)}
                                        opts={ytOpts}
                                        onReady={_onReady}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                )
            })} */}
        </div>
    )
}

export default UserProfile;