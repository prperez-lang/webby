import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Slot, useRouter, usePathname } from 'expo-router';

export default function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
        
        {/* Loading Screen Logo */}
        <Image
          source={require('../../assets/images/Metamorphosis Logo.jpg')}
          style={styles.loadingLogo}
          resizeMode="contain"
        />

        <Text style={styles.brandTitle}>Metamorphosis</Text>
        <Text style={styles.brandSubtitle}>SALON & SPA</Text>
        <ActivityIndicator size="large" color="#3498db" style={styles.spinner} />
      </View>
    );
  }

  const tabs = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Explore', path: '/explore' },
  ];

  return (
    <View style={styles.wrapper}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" translucent={false} />
      
      {/* Header Banner occupying ~15% Screen Height */}
      <View style={styles.headerBanner}>
        <View style={styles.topRowContainer}>
          
          {/* Navigation Tabs with 22px Spacing */}
          <View style={styles.tabsRow}>
            {tabs.map((tab) => {
              const isActive =
                pathname === tab.path || (tab.path === '/' && pathname === '/index');
              return (
                <TouchableOpacity
                  key={tab.path}
                  style={[styles.tabItem, isActive && styles.activeTabItem]}
                  onPress={() => router.push(tab.path as any)}
                >
                  <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Right Branding Section */}
          <View style={styles.rightBranding}>
            <Image
              source={require('../../assets/images/Metamorphosis Logo.jpg')}
              style={styles.headerLogo}
              resizeMode="cover"
            />
            <Text style={styles.brandSubText}>Metamorphosis Salon & Spa</Text>
          </View>

        </View>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingLogo: {
    width: 130,
    height: 130,
    marginBottom: 16,
    borderRadius: 65,
    backgroundColor: '#ffffff',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  brandSubtitle: {
    fontSize: 14,
    color: '#3498db',
    letterSpacing: 3,
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  spinner: {
    marginTop: 30,
  },
  headerBanner: {
    backgroundColor: '#2c3e50',
    paddingTop: Platform.OS === 'android' ? 24 : 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    justifyContent: 'flex-end',
    minHeight: '15%',
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexShrink: 1,
    paddingBottom: 2,
  },
  tabItem: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginRight: 22,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    color: '#bdc3c7',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  rightBranding: {
    alignItems: 'center',
    marginLeft: 6,
  },
  headerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    marginBottom: 3,
  },
  brandSubText: {
    color: '#3498db',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#f4f6f9',
  },
});