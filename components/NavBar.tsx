import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import { useState } from 'react'
import { UserProfile } from '@auth0/nextjs-auth0'
import { NextRouter, withRouter } from 'next/router'
import Link from 'next/link'

interface PageProps {
	user: UserProfile
	router: NextRouter
}

const NavBar = ({user, router}: PageProps) => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logout = async () => {
		// await fetch("/api/auth/logout")
		// router.reload()
	}

	return <AppBar position="static">
		<Toolbar>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<Link href="/" passHref>
					<Typography variant="h6" color="inherit" component="div" sx={{cursor: 'pointer'}}>
						Metron
					</Typography>
				</Link>
			</Box>
			<Box sx={{ flexGrow: 0, display: 'flex' }}>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="Remy Sharp" src={user.picture || ""} />
				</IconButton>
				<Menu
					sx={{ mt: '45px' }}
					id="menu-appbar"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					<MenuItem onClick={handleCloseUserMenu}>
						<Typography textAlign="center" onClick={logout}>Logout</Typography>
					</MenuItem>
				</Menu>
			</Box>
		</Toolbar>
	</AppBar>
}

export default withRouter(NavBar)
