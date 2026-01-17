import { Typography, List, ListItem, Checkbox, Box, Button, ButtonGroup, Divider } from '@mui/material'

interface CalendarListProps {
    isMobile?: boolean
    currentView?: string
    onViewChange?: (view: string) => void
}

export default function CalendarList({ isMobile = false, currentView = 'timeGridWeek', onViewChange }: CalendarListProps) {
    return (
        <>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Calendars
            </Typography>
            <List>
                <ListItem>
                    <Checkbox defaultChecked />
                    Calendar 1
                </ListItem>
                <ListItem>
                    <Checkbox />
                    Calendar 2
                </ListItem>
            </List>

            {isMobile && onViewChange && (
                <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        View
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <ButtonGroup orientation="vertical" fullWidth>
                            <Button
                                variant={currentView === 'timeGridDay' ? 'contained' : 'outlined'}
                                onClick={() => onViewChange('timeGridDay')}
                            >
                                Day
                            </Button>
                            <Button
                                variant={currentView === 'dayGridMonth' ? 'contained' : 'outlined'}
                                onClick={() => onViewChange('dayGridMonth')}
                            >
                                Month
                            </Button>
                        </ButtonGroup>
                    </Box>
                </>
            )}
        </>
    )
}
