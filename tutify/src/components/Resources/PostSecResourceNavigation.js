import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ResourceCard from './ResourceCard';
import Grid from '@material-ui/core/Grid';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function PostSecResourceNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" textAlign="center">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    <Tab label="All" {...a11yProps(0)} />
                    <Tab label="Studying" {...a11yProps(1)} />
                    <Tab label="Writing" {...a11yProps(2)} />
                    <Tab label="Learning" {...a11yProps(3)} />
                    <Tab label="Career" {...a11yProps(4)} />
                    <Tab label="Financial" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Coming soon...
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Studying Tools and Resources
                </Typography>
                <Grid container spacing={4}> 
                    <ResourceCard
                        image="http://www.tomatotimers.com/assets/images/logo.svg"
                        title='Pomodoro for Studying Efficiently'
                        description='The Pomodoro Technique is a time management method that can be used for any task. For many people, time is an enemy. The anxiety triggered by “the ticking clock”, especially when it involves a deadline, leads to ineffective work and study habits which in turn lead to procrastination.
                        The aim of the Pomodoro Technique is to use time as a valuable ally in accomplishing what we want to do in the way we want to do it, and to enable us to improve continually the way we work or study.'
                        link='http://www.tomatotimers.com/'
                    />
                    <ResourceCard
                        image="https://youthincmag.com/wp-content/uploads/2018/01/education-tools.jpg"
                        title='Study Smarter'
                        description='Do you ever feel like your study habits simply aren’t cutting it? Do you wonder what you could be doing to perform better in class and on exams? Many students realize that their high school study habits aren’t very effective in college. This handout offers several tips on effective studying. Implementing these tips into your regular study routine will help you to efficiently and effectively learn course material. Experiment with them and find some that work for you.'
                        link='https://learningcenter.unc.edu/tips-and-tools/studying-101-study-smarter-not-harder/'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Writing Tools and Resources
                </Typography>
                <Grid container spacing={4}> 
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Learning Tools and Resources
                </Typography>
                <Grid container spacing={4}> 
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Career Tools and Resources
                </Typography>
                <Grid container spacing={4}> 
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Financial Tools and Resources
                </Typography>
                <Grid container spacing={4}> 
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                    <ResourceCard
                        image="https://static.wixstatic.com/media/b470fe_19d8658f20074eddb3fc739477259f4b~mv2.jpg"
                        title='Resource Title'
                        description='Resource Description'
                        link='www.google.com'
                    />
                </Grid>
            </TabPanel>
        </div>
    );
}