import React from 'react';
import {PermissionsAndroid} from 'react-native';
import Timer from './components/Timer';

export default function Main() {
  const requestStoragePermission = async () => {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,

        // Добавьте другие разрешения здесь, если необходимо
      ];

      const granted = await PermissionsAndroid.requestMultiple(permissions);

      const allPermissionsGranted = Object.values(granted).every(
        permission => permission === PermissionsAndroid.RESULTS.GRANTED,
      );

      if (allPermissionsGranted) {
        // Все разрешения предоставлены
      }
    } catch (err) {}
  };

  requestStoragePermission();
  return <Timer />;
}
