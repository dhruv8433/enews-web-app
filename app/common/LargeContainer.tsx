'use client'

import React from 'react'
import { Container } from '@mui/material'

const LargeContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container maxWidth="xl">{children}</Container>
    )
}

export default LargeContainer