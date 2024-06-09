import { Box, Stack, Typography, Link } from '@mui/material'
import React from 'react'
import WarningIcon from '@mui/icons-material/Warning';

const PageNotFound = () => {
  return (
    <>
      <Box sx={{display: "grid", placeItems: "center", width: "100%", height: "100%"}}>
        <Stack sx={{alignItems: "center"}}>
          <WarningIcon />
          <Typography variant='h2'>404 Not Found</Typography>
          <Typography variant='subtitle1'>This page does not exist!</Typography>
          <Link sx={{
            color: "inherit",
            padding: 1,
            textDecoration: "underline"
          }} to="/">Go Home</Link>
        </Stack>
      </Box>
    </>
  )
}

export default PageNotFound