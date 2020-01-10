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

// Defines the content of the tab panel
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

// Defines what content is shown based on index of selected tab
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

export default function SecondaryResourceNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Renders the actual navigation bar and dynamic content based on selected tab
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
                    <Tab label="Post-Secondary" {...a11yProps(4)} />
                    <Tab label="Health" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Coming soon...
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Studying Tools and Resources
                </Typography>
                <hr></hr>
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
            <TabPanel value={value} index={2}>
                <Typography variant="h2" component="h1" align="center" gutterBottom>
                    Writing Tools and Resources
                </Typography>
                <hr></hr>
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
                <hr></hr>
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
                    Post-Secondary Tools and Resources
                </Typography>
                <hr></hr>
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
                    Health Tools and Resources
                </Typography>
                <hr></hr>
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