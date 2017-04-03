import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actionCreators from '../actions/App';
import Controls from '../components/Controls';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchStatus();
    this.props.fetchQueue();
  }

  renderApp() {
    return (
      <div>
        <Controls 
          {...this.props.mpdStatus}
          currentSong={this.props.queue.queue[this.props.mpdStatus.song]}
          updateStatus={this.props.updateStatus}
          fetchStatus={this.props.fetchStatus}
        />
      </div>
    );
  }

  render() {
    if (
      this.props.mpdStatus &&
      this.props.updateStatus &&
      this.props.queue //todo: need a better check than this
    ) {
      return this.renderApp();
    }
    return null;
  }
}

App.propTypes = {
  mpdStatus: React.PropTypes.object,
  queue: React.PropTypes.object,
  fetchStatus: React.PropTypes.func.isRequired,
  fetchQueue: React.PropTypes.func.isRequired,
  updateStatus: React.PropTypes.func.isRequired
};

export const AppInnerComponent = App;

export default connect(
  state => ({
    mpdStatus: state.mpdStatus,
    queue: state.queue
  }),
  dispatch => bindActionCreators(
    _.assign({}, actionCreators),
    dispatch)
)(AppInnerComponent);
