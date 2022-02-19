import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';

export function CustomDrawerContent(props: any) {
  return(
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props} style={{flex: 1}}>
        <Drawer.Section style={{marginTop: 20}}>
          <DrawerItem
            label="Animated 1"
            onPress={() => {props.navigation.navigate('Tabs1')}}
          />
          <DrawerItem
            label="Animated 2"
            onPress={() => {props.navigation.navigate('Tabs2')}}
          />
          <DrawerItem
            label="Animated 3"
            onPress={() => {props.navigation.navigate('Tabs3')}}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  )
}
