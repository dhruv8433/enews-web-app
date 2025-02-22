import UserComments from '@/app/components/profile/UserComments'
import UserFavs from '@/app/components/profile/UserFavs'
import UserNotifications from '@/app/components/profile/UserNotifications'
import UserReadLater from '@/app/components/profile/UserReadLater'
import { siteName } from '@/app/site/site.config'
import React from 'react'

const ConditionRender = ({ option }: { option: string }) => {
    if (option === 'favorites') {
        document.title = `${siteName} | Favorites`;
        return <UserFavs />
    }
    else if (option === 'read-later') {
        document.title = `${siteName} | Read Later`;
        return <UserReadLater />
    }
    else if (option === 'comments') {
        document.title = `${siteName} | Comments`;
        return <UserComments />
    }
    else if (option === 'notifications') {
        document.title = `${siteName} | Notifications`;
        return <UserNotifications />
    }
    else {
        return <UserFavs />
    }
}

export default ConditionRender