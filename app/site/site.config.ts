/**
 * Site configuration file
 * 2025, All rights reserved
 */

import { BookmarkBorder, DeleteOutline, Facebook, FavoriteBorder, GitHub, Instagram, LinkedIn, LogoutOutlined, MapsUgcOutlined, NotificationsOutlined, Twitter } from '@mui/icons-material'
import { Routes } from '../types/routes.types';
import { navIcon } from '../types/navicon.types';

// navigation routes for website
const routes: Routes[] = [{
    name: "Home",
    url: "/"
},
{
    name: "Popular",
    url: '/query?q=popular'
},
{
    name: "live",
    url: "/query?q=live"
},
{
    name: "sports",
    url: "/query?q=sports"
}]

//icons that used for header
const navIcons: navIcon[] = [{
    name: 'insta',
    url: "https://www.instagram.com/dhruv_s_o_n_i_",
    icon: Instagram
}, {
    name: "Twitter",
    icon: Twitter,
    url: "https://x.com/dhruv_s_o_n_i"
}, {
    name: "Github",
    icon: GitHub,
    url: "https://github.com/dhruv8433"
}, {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/dhruv.soni.9809"
}, {
    name: "LinkedIn",
    icon: LinkedIn,
    url: "https://www.linkedin.com/in/dhruv-soni-6b2338230/"
}
];

const version = "1.0.0";

const imageUrl = "https://www.nytimes.com/";

const categorys = [
    "All",
    "Technology",
    "Sports",
    "Business",
    "Health",
    "Family",
    "Social",
    "War",
    "Education",
    "Headlines",
    "Car",
    "Travel",
    "Science",
    "Religion",
    "Politics",
    "Environment",
];

const profileLinks = [
    { name: "Favorites", icon: FavoriteBorder , route: "favorites" },
    { name: "Read Later", icon: BookmarkBorder, route: "read-later" },
    { name: "Comments", icon: MapsUgcOutlined, route: "comments" },
    { name: "Notifications", icon: NotificationsOutlined , route: "notifications" },
    { name: "Delete Account", icon: DeleteOutline, route: "delete-account", danger: true },
    { name: "Logout", icon: LogoutOutlined, route: "logout", danger: true },
];

export { routes, navIcons, imageUrl, categorys, profileLinks };