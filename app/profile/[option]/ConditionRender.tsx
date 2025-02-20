import UserComments from '@/app/components/profile/UserComments'
import UserFavs from '@/app/components/profile/UserFavs'
import UserNotifications from '@/app/components/profile/UserNotifications'
import UserReadLater from '@/app/components/profile/UserReadLater'
import React from 'react'

const ConditionRender = ({ option }: { option: string }) => {
    if (option === 'favorites') {
        return <UserFavs />
    }
    else if (option === 'read-later') {
        return <UserReadLater />
    }
    else if (option === 'comments') {
        return <UserComments />
    }
    else if (option === 'notifications') {
        return <UserNotifications />
    }

}

export default ConditionRender