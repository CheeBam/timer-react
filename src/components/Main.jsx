import React, { Component , Fragment } from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import styles from '../styles';
import Task from './parts/Task';
import Log from './parts/Log';
import Chart from './parts/Chart';

class Main extends Component {

    getCurrentTab = () => {
        const { match: { params: { tab = 'log' }} } = this.props;
        return tab;
    };

    renderTab = () => {
        const tab = this.getCurrentTab();

        switch (tab) {
            case 'log':
                return <Log/>;
            case 'chart':
                return <Chart/>;
            default:
                return '';
        }

    };

    render() {
        const { classes } = this.props;
        const tab = this.getCurrentTab();
        return (
            <Fragment>
                <Task/>
                <Grid container spacing={8} justify={'center'} className={classes.mainContainer}>
                    <Grid container spacing={8} lg={1} md={0}/>
                    <Grid container spacing={8} lg={9} md={12}>
                        <Tabs value={tab} className={classes.mainTabList} variant='fullWidth'>
                            <Tab className={classes.mainTab} label='Tasks log' value='log' component={Link} to='/log'/>
                            <Tab className={classes.mainTab} label='Tasks chart' value='chart' component={Link} to='/chart'/>
                        </Tabs>
                        { this.renderTab() }
                    </Grid>
                    <Grid container spacing={8} lg={1} md={0}/>
                </Grid>
            </Fragment>
        )
    }

} export default withStyles(styles)(Main);
