import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { DateTime } from 'luxon';

import { withStyles } from '@material-ui/core/styles/index';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import styles from '../../styles';
import { clearLogAction, createLogAction} from '../../actions/timer';

import { getRandom, buildChartData } from '../../helpers';
import { GENERATE_MIN_DURATION, GENERATE_MAX_DURATION, GENERATE_MIN_INTERVAL, GENERATE_MAX_INTERVAL, GENERATE_MIN_TASKS, GENERATE_MAX_TASKS, GENERATE_START_HOUR}  from '../../helpers/constants';

class Chart extends Component {

    generateEvents = () => {
        const { createLog, clearLog } = this.props;

        clearLog();

        let date = DateTime.fromObject({ hour: GENERATE_START_HOUR });
        const list = [];

        for (let i = 1; i < getRandom(GENERATE_MIN_TASKS, GENERATE_MAX_TASKS); i++) {
            const interval = getRandom(GENERATE_MIN_INTERVAL, GENERATE_MAX_INTERVAL);
            const minutes = getRandom(GENERATE_MIN_DURATION, GENERATE_MAX_DURATION);
            const start = date.plus({ minutes: interval });
            const end = start.plus({ minutes });
            date = date.plus({ minutes: minutes + interval });

            const item = {
                id: i,
                name: `item${i}`,
                start: start.toISO(),
                end: end.toISO(),
                duration: end.diff(start, ['hours', 'minutes', 'seconds']).toObject(),
            };

            list.push(item);
        }

        createLog(list);
    };

    render() {
        const { classes, list } = this.props;

        return (
            <Fragment>
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={buildChartData(list)} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>>
                        <XAxis dataKey='hour' />
                        <YAxis />
                        <CartesianGrid/>
                        <Bar type='monotone' dataKey='value' name='Minutes in this hours' fill='#3248C7' barSize={30} />
                        <Legend verticalAlign='bottom' />
                    </BarChart>
                </ResponsiveContainer>
                <Grid container>
                    <Grid item xs={12} className={classes.chartButtonContainer}>
                        <Button variant='contained' size='small' className={classes.button} onClick={this.generateEvents}>
                            Generate
                        </Button>
                    </Grid>
                </Grid>
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        list: state.timer.list,
    }),
    (dispatch) => ({
        createLog: (list) => dispatch(createLogAction(list)),
        clearLog: () => dispatch(clearLogAction()),
    })
    )(withStyles(styles)(Chart));
