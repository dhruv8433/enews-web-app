import { Grid } from '@mui/material'
import React from 'react'
import BusinessSection from './BusinessSection'
import CareerSection from './CareerSection'

const BusinessAndCareerGrid = () => {
  return (
    <div>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <BusinessSection />
            </Grid>
            <Grid item xs={12} md={6}>
                <CareerSection />
            </Grid>
        </Grid>
    </div>
  )
}

export default BusinessAndCareerGrid