'use client'

import React from 'react'
import { Container } from '@mui/material'

const LargeContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <Container maxWidth="xl" className={className}>{children}</Container>
    )
}

export default LargeContainer