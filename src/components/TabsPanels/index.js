import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import SwipeableViews from 'react-swipeable-views'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            style={{ width: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}>
            {value === index && (
                <Box
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        padding: '0px',
                    }}
                    p={3}>
                    {children}
                </Box>
            )}
        </div>
    )
}
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

function Component(props) {
    const { tabs } = props

    const theme = useTheme()
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }
    return (
        <React.Fragment>
            <AppBar
                position={'relative'}
                color={'transparent'}
                style={{ boxShadow: 'none', width: '100%' }}>
                <Tabs
                    scrollButtons="on"
                    value={value}
                    variant="scrollable"
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="primary"
                    aria-label="simple tabs example">
                    {tabs.map((val, ind) => {
                        return (
                            <Tab
                                label={val.name}
                                key={val.name}
                                {...a11yProps(ind)}
                            />
                        )
                    })}
                </Tabs>
            </AppBar>
            <Divider style={{ width: '100%' }}></Divider>

            <section>
                <SwipeableViews
                    style={{ width: '100%' }}
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}>
                    {tabs.map((val, ind) => {
                        const Page = val.value
                        return (
                            <TabPanel
                                key={val.name}
                                value={value}
                                index={ind}
                                dir={theme.direction}>
                                <Page {...props} />
                            </TabPanel>
                        )
                    })}
                </SwipeableViews>
            </section>
        </React.Fragment>
    )
}

export default Component
