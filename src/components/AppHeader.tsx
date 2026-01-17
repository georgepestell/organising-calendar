import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import MenuIcon from '@mui/icons-material/Menu'

interface AppHeaderProps {
    onMenuClick: () => void
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <AppBar position="static" elevation={1}>
            <Toolbar>
                {isMobile && (
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                )}
                <CalendarMonthIcon sx={{ mr: 2 }} />
                <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
                    Organising Calendar
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
