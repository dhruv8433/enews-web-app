/**
 * Site configuration file
 * 2025, All rights reserved
 */

import { Facebook, GitHub, Instagram, LinkedIn, Twitter } from '@mui/icons-material'
import { Routes } from '../types/routes.types';
import { navIcon } from '../types/navicon.types';

// navigation routes for website
const routes: Routes[] = [{
    name: "Home",
    url: "/"
},
{
    name: "Popular",
    url: '/popular'
},
{
    name: "live",
    url: "/live"
},
{
    name: "sports",
    url: "/sports"
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

export { routes, navIcons, imageUrl };