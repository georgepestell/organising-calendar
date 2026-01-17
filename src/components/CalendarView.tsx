import { styled } from '@mui/material/styles'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { EventInput } from '@fullcalendar/core/index.js'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { Box } from '@mui/material'
import { useRef, useEffect } from 'react'

const StyledCalendar = styled(Box)(({ theme }) => ({
    '--fc-today-bg-color': 'hsla(214, 100%, 99%, 0.96)',
    width: '100%',
    height: '100%',
    display: 'block',
    paddingRight: '20px',
    '& .fc-header-toolbar': {
        position: 'sticky',
        top: 0,
        zIndex: 11,
        backgroundColor: '#fff',
        paddingBottom: '10px',
        marginBottom: '0px !important',
        borderBottom: '1px solid #ddd',
    },
    '& .fc-toolbar-chunk:nth-of-type(2)': {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    '& .fc-toolbar-chunk:nth-of-type(3)': {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    '& .fc-scroller': {
        overflow: 'visible !important',
    },
    '& .fc-scrollgrid-section-header': {
        position: 'sticky',
        top: '54px',
        zIndex: 10,
        borderBottom: '1px solid #ddd',
        backgroundColor: '#fff',
    },
    '& .fc-scrollgrid-section-header > *': {
        position: 'relative',
        zIndex: 10,
        backgroundColor: '#fff',
    },
    '& .fc-scrollgrid-section-header th': {
        backgroundColor: '#fff',
    },
    '& .fc-col-header': {
        backgroundColor: '#fff',
    },
    '& .fc-scrollgrid-section-body': {
        position: 'relative',
        zIndex: 1,
    },
    '& .simplebar-scrollbar::before': {
        background: 'linear-gradient(#ffffff, #103E62)',
        opacity: '1 !important',
    },
    '& .simplebar-track.simplebar-vertical': {
        width: '15px',
        background: '#fff',
        boxShadow: 'inset 0 0 5px grey',
        top: '110px !important',
        height: 'calc(100% - 110px) !important',
    },
    '& .simplebar-track': {
        opacity: '1 !important',
    },
}))

interface CalendarViewProps {
    events: EventInput[]
    currentView: string
    isMobile: boolean
}

export default function CalendarView({ events, currentView, isMobile }: CalendarViewProps) {
    const calendarRef = useRef<any>(null)

    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi()
            calendarApi.changeView(currentView)
        }
    }, [currentView])

    return (
        <SimpleBar style={{ height: '100%' }} forceVisible="y" autoHide={false}>
            <StyledCalendar>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin, dayGridPlugin]}
                    initialView={isMobile ? 'dayGridMonth' : 'timeGridWeek'}
                    events={events}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: isMobile ? '' : 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    height="auto"
                    nowIndicator
                    themeSystem="flatly"
                />
            </StyledCalendar>
        </SimpleBar>
    )
}
