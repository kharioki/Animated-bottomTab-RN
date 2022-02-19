/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useRef, useEffect } from 'react';
import { ColorSchemeName, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { CustomDrawerContent } from '../components/CustomDrawerContent';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import SearchScreen from '../screens/SearchScreen';
import AccountScreen from '../screens/AccountScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { View, Text } from '../components/Themed';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppDrawer />
    </NavigationContainer>
  );
}  

const Drawer = createDrawerNavigator();

function AppDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs1" component={Tab1Stack} />
      <Drawer.Screen name="Tabs2" component={Tab2Stack} />
      <Drawer.Screen name="Tabs3" component={Tab3Stack} />
    </Drawer.Navigator>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tab1Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Tab1" 
        component={BottomTab1} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function Tab2Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Tab2" 
        component={BottomTab2} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function Tab3Stack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Tab3" 
        component={BottomTab3} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const TabArr = [
  {
    name: 'Home',
    label: 'Home',
    activeIcon: 'view-grid',
    inactiveIcon: 'view-grid-outline',
    component: HomeScreen,
    color: '#00ffff',
    alphaColor: '#b0e0e6',
  },
  {
    name: 'List',
    label: 'List',
    activeIcon: 'heart-plus',
    inactiveIcon: 'heart-plus-outline',
    component: ListScreen,
    color: '#ff94c9',
    alphaColor: '#ffbdde',
  },
  {
    name: 'Search',
    label: 'Search',
    activeIcon: 'timeline-plus',
    inactiveIcon: 'timeline-plus-outline',
    component: SearchScreen,
    color: '#a024ff',
    alphaColor: '#b452ff',
  },
  {
    name: 'Account',
    label: 'Account',
    activeIcon: 'account-circle',
    inactiveIcon: 'account-circle-outline',
    component: AccountScreen,
    color: '#bc8e52',
    alphaColor: '#c7a170',
  },
];

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' }})
    } else {
      viewRef.current.animate({0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' }})
    }
  }, [focused]);

  return(
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}
      >
        <TabBarIcon name={focused ? item.activeIcon : item.inactiveIcon} color={focused ? item.color : '#637aff49' } />
      </Animatable.View>
    </TouchableOpacity>
  )
}

const animate1 = {0: { scale: .5, translateY: 8 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 }};
const animate2 = {0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 8 }};

const circle1 = {0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 }};
const circle2 = {0: { scale: 1 }, 1: { scale: 0 }};

const TabButton2 = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1)
      circleRef.current.animate(circle1)
      textRef.current.transitionTo({scale: 1})
    } else {
      viewRef.current.animate(animate2)
      circleRef.current.animate(circle2)
      textRef.current.transitionTo({scale: 0})
    }
  }, [focused]);

  return(
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
        style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View
            ref={circleRef} 
            style={[styles.circle, { backgroundColor: item.color }]} />
          <TabBarIcon 
            name={focused ? item.activeIcon : item.inactiveIcon}
            color={focused ? '#fff' : '#637aff49' }
          />
        </View>
        <Animatable.Text
          ref={textRef}
          style={[styles.text, { color: item.color }]}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const TabButton3 = (props: any) => {
  const { item, onPress, accessibilityState } = props
  const focused = accessibilityState.selected;

  const viewRef = useRef(null);
  const textRef = useRef(null);
  
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({0: { scale: 0 }, 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 }, 1: { scale: 1 }})
      textRef.current.animate({0: { scale: 0 }, 1: { scale: 1 }})
    } else {
      viewRef.current.animate({0: { scale: 1 }, 1: { scale: 0 }})
      textRef.current.animate({0: { scale: 1 }, 1: { scale: 0 }})
    }
  }, [focused]);

  return(
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { flex: focused ? 1 : 0.65 } ]}>
      <View>
        <Animatable.View
          ref={viewRef} 
          style={[StyleSheet.absoluteFillObject, { backgroundColor: item.color, borderRadius: 16 }]} />
        <View style={[styles.button, { backgroundColor: focused ? null : item.alphaColor }]}>
          <TabBarIcon name={focused ? item.activeIcon : item.inactiveIcon} color={focused ? '#fff' : '#637aff49' } />
          <Animatable.View ref={textRef}>
            {focused && <Text style={{ color: '#fff', paddingHorizontal: 8, fontWeight: 'bold' }}>{item.label}</Text>}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  }
});

function BottomTab1() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
        }
      }}>
      {TabArr.map((item) => {
        const { name, label, activeIcon, inactiveIcon, component } = item
        return (
          <BottomTab.Screen
            key={name}
            name={name}
            component={component}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              // tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? activeIcon : inactiveIcon} color={color} />,
              tabBarButton: (props) => <TabButton {...props} item={item} />
            })}
          />
        )
      })}
    </BottomTab.Navigator>
  );
}

function BottomTab2() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
        }
      }}>
      {TabArr.map((item) => {
        const { name, label, activeIcon, inactiveIcon, component } = item
        return (
          <BottomTab.Screen
            key={name}
            name={name}
            component={component}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              // tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? activeIcon : inactiveIcon} color={color} />,
              tabBarButton: (props) => <TabButton2 {...props} item={item} />
            })}
          />
        )
      })}
    </BottomTab.Navigator>
  );
}

function BottomTab3() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          borderRadius: 20,
          backgroundColor: Colors[colorScheme].background,
        }
      }}>
      {TabArr.map((item) => {
        const { name, label, activeIcon, inactiveIcon, component } = item
        return (
          <BottomTab.Screen
            key={name}
            name={name}
            component={component}
            options={({ navigation }) => ({
              tabBarShowLabel: false,
              // tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? activeIcon : inactiveIcon} color={color} />,
              tabBarButton: (props) => <TabButton3 {...props} item={item} />
            })}
          />
        )
      })}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={24} style={{ marginBottom: -6 }} {...props} />;
}
