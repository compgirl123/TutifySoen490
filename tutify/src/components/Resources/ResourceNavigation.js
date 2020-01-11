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

// returns a new array of resources based on the tab category
function filteredRes(index, res) {
    if (index === 0)
        return res

    if (index === 1)
        return res.filter(res => res.category === "Studying");

    if (index === 2)
        return res.filter(res => res.category === "Writing");

    if (index === 3)
        return res.filter(res => res.category === "Learning");

    if (index === 4)
        return res.filter(res => res.category === "Career");

    if (index === 5)
        return res.filter(res => res.category === "Health");

}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

// Renders the actual navigation bar and dynamic content based on selected tab
export default function ResourceNavigation(props) {
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
                    <Tab label="Health" {...a11yProps(5)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(0, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Studying Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(1, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Writing Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(2, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Learning Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(3, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Career Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(4, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    Health Tools and Resources
                </Typography>
                <hr></hr>
                <Grid container spacing={4}>
                    {filteredRes(5, props.res).map((ressource, i) => (
                        <ResourceCard
                            id={i}
                            image={ressource.img}
                            title={ressource.title}
                            description={ressource.desc}
                            link={ressource.link}
                        />
                    ))}
                </Grid>
            </TabPanel>
        </div>
    );
}