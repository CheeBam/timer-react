import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Duration } from 'luxon';

import Fab from '@material-ui/core/Fab';
import { withStyles } from "@material-ui/core/styles";

import styles from '../../styles';

class Timer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            time: Duration.fromMillis(props.duration ? props.duration : 0),
            intervalId: null,
        };
    }

    static propTypes = {
        started: PropTypes.bool.isRequired,
        duration: PropTypes.number,
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
            })
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

    state = {
        time: null,
    };

    render() {
        const { time } = this.state;
        const { classes } = this.props;

        return (
            <Fab variant="round" className={classes.timerClock}>
                { time.toFormat('hh:mm:ss') }
            </Fab>
        );
    }
} export default withStyles(styles)(Timer);
