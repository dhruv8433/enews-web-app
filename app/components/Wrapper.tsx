'use client'

import React, { useEffect } from 'react'
import { registerServiceWorker, requestNotificationPermission } from '../site/firebase.config'

const Wrapper = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    useEffect(() => {
        const setupFCM = async () => {
            await registerServiceWorker()
            await requestNotificationPermission()
        }
        setupFCM()
    }, [])
    return (
        <div>{children}</div>
    )
}

export default Wrapper