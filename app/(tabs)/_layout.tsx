import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '@/components/TabBar';

const TabLayout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />}> 
      <Tabs.Screen name="index" options={{ title: "Home", headerTitleAlign: 'center' }} />
      <Tabs.Screen name="explore" options={{ title: "Explore", headerTitleAlign: 'center' }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", headerTitleAlign: 'center' }} />
    </Tabs>
  )
}

export default TabLayout;