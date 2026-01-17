import { useEffect, useState } from 'react'
import type { EventInput } from '@fullcalendar/core/index.js'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Container, Paper, Box, Drawer, useMediaQuery, useTheme } from '@mui/material'
import AppHeader from './components/AppHeader'
import CalendarList from './components/CalendarList'
import CalendarView from './components/CalendarView'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f5f7fa',
        },
    },
    typography: {
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif',
    },
})

const DRAWER_WIDTH = 300

function App() {
    const [events, setEvents] = useState<EventInput[]>([])
    const [mobileOpen, setMobileOpen] = useState(false)
    const [currentView, setCurrentView] = useState('timeGridWeek')
    const muiTheme = useTheme()
    const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'))

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleViewChange = (view: string) => {
        setCurrentView(view)
        if (isMobile) {
            setMobileOpen(false)
        }
    }

    useEffect(() => {
        async function loadEvents() {
            setEvents([
                { title: 'event 1', date: '2019-04-01' },
                { title: 'event 2', date: '2019-04-02' },
            ])
        }
        loadEvents()
    }, [])

    useEffect(() => {
        // Set default view for mobile
        if (isMobile && currentView === 'timeGridWeek') {
            setCurrentView('dayGridMonth')
        }
    }, [isMobile])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <AppHeader onMenuClick={handleDrawerToggle} />
                <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
                    {/* Mobile Drawer */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better mobile performance
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, p: 3 },
                        }}
                    >
                        <CalendarList isMobile={true} currentView={currentView} onViewChange={handleViewChange} />
                    </Drawer>

                    <Container
                        maxWidth="xl"
                        sx={{ mt: 4, mb: 4, flex: 1, display: 'flex', flexDirection: 'row', gap: 2, overflow: 'visible' }}
                    >
                        {/* Desktop Sidebar */}
                        <Paper
                            sx={{
                                minWidth: `${DRAWER_WIDTH}px`,
                                flex: 1,
                                p: 3,
                                overflow: 'auto',
                                display: { xs: 'none', md: 'block' },
                            }}
                        >
                            <CalendarList />
                        </Paper>

                        {/* Calendar */}
                        <Paper
                            elevation={2}
                            sx={{
                                borderRadius: 2,
                                flex: { xs: 1, md: 11 },
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CalendarView events={events} currentView={currentView} isMobile={isMobile} />
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default App
