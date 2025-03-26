"use client";

import dynamic from "next/dynamic";
import LargeContainer from "./common/LargeContainer";
import ListCategoryContainer from "./common/ListContainer";
import HomeSwiper from "./components/home/HomeSwiper";
import LazyComponent from "./common/LazyComponent";
import { useEffect } from "react";
import OneSignal from 'react-onesignal';

// ✅ Lazy load components
const BusinessAndCareerGrid = dynamic(() => import("./components/home/BusinessAndCareerGrid"), { ssr: false });
const EducationSection = dynamic(() => import("./components/home/EducationSection"), { ssr: false });

export default function Home() {

  useEffect(() => {

    OneSignal.init({
      appId: "5f01d1a7-36f9-4150-9451-3b37d7e49dbb",
      safari_web_id: "web.onesignal.auto.66c89079-ab76-4c24-84be-2fca07f56f6c",
      notifyButton: {
        enable: true,
        prenotify: true,
        showCredit: false,
        text: {
          'tip.state.unsubscribed': 'Subscribe to notifications',
          'tip.state.subscribed': 'You are subscribed',
          'tip.state.blocked': 'You have blocked notifications',
          'message.prenotify': 'Click to subscribe to notifications',
          'message.action.subscribing': 'Subscribing...', // ✅ Added missing key
          'message.action.subscribed': 'Thanks for subscribing!',
          'message.action.resubscribed': 'You have resubscribed!',
          'message.action.unsubscribed': 'You won\'t receive notifications anymore',
          'dialog.main.title': 'Manage Site Notifications',
          'dialog.main.button.subscribe': 'Subscribe',
          'dialog.main.button.unsubscribe': 'Unsubscribe',
          'dialog.blocked.title': 'Notifications Blocked', // ✅ Added missing key
          'dialog.blocked.message': 'Please unblock notifications to receive updates.' // ✅ Added missing key
        }
      }
    });
  }, []);


  return (
    <LargeContainer>
      {/* Home page Swiper */}
      <HomeSwiper />

      {/* List Category Container */}
      <ListCategoryContainer />

      {/* Business & Career Section */}
      <LazyComponent component={BusinessAndCareerGrid} />

      {/* Education Section */}
      <LazyComponent component={EducationSection} />

    </LargeContainer>
  );
}
