import React, { PureComponent } from 'react';
// eslint-disable-next-line
import PropTypes from 'prop-types';

import { Duration } from 'luxon';

import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

import styles from '../../styles';

class Timer extends PureComponent {
  static propTypes = {
    started: PropTypes.bool.isRequired,
    duration: PropTypes.number,
  };

  static defaultProps = {
    duration: 0,
  };

  constructor(props) {
    super(props);
    const { duration } = props;

    this.state = {
      time: Duration.fromMillis(duration),
      intervalId: null,
    };
  }

  state = {
    time: null,
  };

  componentDidMount() {
    const { started } = this.props;
    this.runner(started);
  }

  componentDidUpdate(prevProps) {
    const { started } = this.props;
    if (started !== prevProps.started) {
      this.runner(started);
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;

    clearInterval(intervalId);
  }

  runner(value) {
    const { intervalId } = this.state;

    if (value) {
      const interval = setInterval(() => {
        this.addSecond();
      }, 1000);
      this.setState({
        intervalId: interval,
      });
    } else {
      clearInterval(intervalId);
      this.setState({
        time: Duration.fromMillis(0),
      });
    }
  }

  addSecond() {
    const { time } = this.state;
    this.setState({
      time: time.plus(Duration.fromMillis(1000)),
    });
  }

  render() {
    const { time } = this.state;
    const { classes } = this.props;

    return (
      <Fab variant="round" className={classes.timerClock}>
        {time.toFormat('hh:mm:ss')}
      </Fab>
    );
  }
}
export default withStyles(styles)(Timer);
