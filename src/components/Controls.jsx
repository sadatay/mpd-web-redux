import React from 'react';
import _ from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import { Button, Glyphicon, ButtonToolbar, ProgressBar, Label, Panel } from 'react-bootstrap';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    _.bindAll(this, 
      'play', 'pause', 'togglePlay', 'trackElapsed',
      'trackLength', 'next', 'previous'
    );
  }
  togglePlay() {
    if (this.props.state === 'play') {
      this.pause();
    } else {
      this.play();
    }
  }
  play() {
    this.props.updateStatus({ song: this.props.song, state: "play" });
  }
  pause() {
    this.props.updateStatus({ song: this.props.song, state: "pause" });
  }
  next() {
    let nextSongId = this.props.song + 1;
    if ( nextSongId < this.props.playlistlength ) {
      this.props.updateStatus({ song: nextSongId, state: this.props.state });
    }
  }
  previous() {
    let prevSongId = this.props.song - 1;
    if ( prevSongId > 0 ) {
      this.props.updateStatus({ song: prevSongId, state: this.props.state });
    }
  }
  trackElapsed() {
    if(this.props.time[0]){
      let date = new Date(null);
      date.setSeconds(this.props.time[0]);
      return date.toISOString().substr(14, 5);
    }
    return "--:--"
  }
  trackLength() {
    if(this.props.time[1]){
      let date = new Date(null);
      date.setSeconds(this.props.time[1]);
      return date.toISOString().substr(14, 5);
    }
    return "--:--"
  }
  trackProgress() {
    // eslint-disable-next-line
    return parseInt((this.props.time[0] / this.props.time[1]) * 100);
  }
  render() {
    if(this.props.state === 'play') {
      this.props.fetchStatus();
    }
    return(
      <Row top="xs" center="xs">
        <Col xs={2} >
          <Row start="xs">
              <Col xs={12}>
                <Panel header="Now Playing">
                  <Glyphicon glyph="user" />&nbsp;&nbsp;
                  <Label>{this.props.currentSong ? this.props.currentSong.artist : ''}</Label><br/>
                  <Glyphicon glyph="record" />&nbsp;&nbsp;
                  <Label>{this.props.currentSong ? this.props.currentSong.album : ''}</Label><br/>
                  <Glyphicon glyph="music" />&nbsp;&nbsp;
                  <Label>{this.props.currentSong ? this.props.currentSong.title : ''}</Label><br/>
                  <Glyphicon glyph="calendar" />&nbsp;&nbsp;
                  <Label>{this.props.currentSong ? this.props.currentSong.date : ''}</Label><br/>
                </Panel>
              </Col>
          </Row>  
        </Col>
        <Col xs={6}>
          <Panel header="Controls">
            <Row>
              <Col xs={12}>
                <ProgressBar bsStyle="success" now={this.trackProgress()} />
              </Col>
            </Row>
            <Row start="xs">
              <Col>
                <ButtonToolbar>
                  <Button bsStyle="info" onClick={this.previous}>
                    <Glyphicon glyph="fast-backward" />
                  </Button>
                  <Button bsStyle="success" onClick={this.togglePlay}>
                    <Glyphicon glyph={this.props.state === 'play' ? 'pause' : 'play'} />
                  </Button>
                  <Button bsStyle="info" onClick={this.next}>
                    <Glyphicon glyph="fast-forward" />
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Panel>
        </Col>
      </Row>
    );
  }
}

Controls.propTypes = {
  consume: React.PropTypes.bool,
  playlistlength: React.PropTypes.number,
  random: React.PropTypes.bool,
  repeat: React.PropTypes.bool,
  single: React.PropTypes.bool,
  song: React.PropTypes.number,
  songid: React.PropTypes.number,
  state: React.PropTypes.string,
  volume: React.PropTypes.number,
  time: React.PropTypes.array,
  updateStatus: React.PropTypes.func,
  fetchStatus: React.PropTypes.func,
  currentSong: React.PropTypes.object
};

export default Controls;