import { Grid } from '@mui/material'
import React from 'react'
import AdventureSection from './AdventureSection'
import TravelSection from './TravelSection'

const TravelAndAdventureGrid = () => {
    return (
        <div> <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <AdventureSection />
            </Grid>
            <Grid item xs={12} md={6}>
                <TravelSection />
            </Grid>
        </Grid></div>
    )
}

export default TravelAndAdventureGrid