import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { DateTime } from 'luxon';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';
import ring from '../styles/images/ring.svg';
import { getTask, clearTask } from '../actions/task';

class Info extends PureComponent {

    componentDidMount() {
        const { match, getTask } = this.props;

        if (match.params.id) {
            getTask(match.params.id)
        }
    }

    componentWillUnmount() {
        const { clearTask } = this.props;

        clearTask()
    }

    renderInfo() {
        const { task, classes } = this.props;
        const { item } = task;

        if (task.loading) {
            return (
                <div className={classes.infoPreloader}>
                    <img src={ring} alt="" height={100} />
                </div>
            )
        } else if (task.failed && item === 404) {
            return (
                <Redirect to='/404' />
            )
        } else if (task.success) {
            return (
                <Card className={classes.infoCard}>
                    <CardActionArea>
                        <CardHeader title={item.name} align='center'/>
                        <Divider/>
                        <CardContent>
                            <React.Fragment>
                                <Typography variant='h6' component='h5'>
                                    ID: {item.id}
                                </Typography>
                                <Typography variant='h6' component='h5'>
                                    Start: {DateTime.fromISO(item.start).toFormat('HH:mm:ss')}
                                </Typography>
                                <Typography variant='h6' component='h5'>
                                    End: {DateTime.fromISO(item.end).toFormat('HH:mm:ss')}
                                </Typography>
                                <Typography variant='h6' component='h5'>
                                    Duration: {DateTime.fromObject(item.duration || {}).toFormat('HH:mm:ss')}
                                </Typography>
                            </React.Fragment>
                        </CardContent>
                        <Divider/>
                    </CardActionArea>

                    <CardActions className={classes.infoFooter}>
                        <Button
                            className={classes.button}
                            variant='contained'
                            component={Link}
                            to={'/log'}
                        >
                            Back
                        </Button>
                    </CardActions>
            </Card>
            )
        }
    }

    render() {
        return (
            <Grid container justify={'center'}>
                { this.renderInfo() }
            </Grid>
        )
    }
}
export default connect(
    (state) => ({
        task: state.task,
    }), (dispatch) => ({
        getTask: (id) => dispatch(getTask(id)),
        clearTask: () => dispatch(clearTask()),
    }))(withStyles(styles)(Info));
