import { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { EventInput } from '@fullcalendar/core/index.js'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, AppBar, Toolbar, Typography, Container, Paper, Box } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'

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

function App() {
    const [events, setEvents] = useState<EventInput[]>([])

    useEffect(() => {
        async function loadEvents() {
            setEvents([
                { title: 'event 1', date: '2019-04-01' },
                { title: 'event 2', date: '2019-04-02' },
            ])
        }
        loadEvents()
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <AppBar position="static" elevation={1}>
                    <Toolbar>
                        <CalendarMonthIcon sx={{ mr: 2 }} />
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                            Organising Calendar
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flex: 1 }}>
                    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                        <FullCalendar
                            plugins={[timeGridPlugin, dayGridPlugin]}
                            initialView="timeGridWeek"
                            events={events}
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay',
                            }}
                            height="auto"
                        />
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default App
