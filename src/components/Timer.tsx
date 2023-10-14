import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {secondToHMS} from '../utils/secondToHMS';

export default function Timer() {
  let startTime: any;
  let elapsedSeconds: any;
  const [time, setTime] = useState(0);

  //   Задача для работы в фоне
  const timer = () => {
    const currentTime: any = new Date();
    elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
    setTime(elapsedSeconds);
  };

  const update = () => {
    timer();
    ReactNativeForegroundService.update({
      id: 1244,
      title: 'Фоновый сервис.',
      message: secondToHMS(elapsedSeconds, 'HMS'),
      icon: 'ic_launcher',
      largeIcon: require('../assets/images/audiobook.png'),
      button: true,
      button2: true,
      buttonText: 'Button1',
      button2Text: 'Button2',
      // buttonOnPress: 'cray',
      // setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: 50,
      },
    });
  };
  // ==========================================
  useEffect(() => {
    ReactNativeForegroundService.add_task(() => update(), {
      delay: 5000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => {
        console.log('Error logging:', e);
      },
    });
  }, []);
  // ===========================================

  const startTask = () => {
    if (!ReactNativeForegroundService.is_running()) {
      startTime = new Date();

      ReactNativeForegroundService.start({
        id: 1244,
        //   title: 'Фоновый сервис.',
        //   message: 'Просто Таймер',
        //   icon: 'ic_launcher',
        //   largeIcon: require('../assets/images/audiobook.png'),
        //   button: true,
        //   button2: true,
        //   buttonText: 'Button',
        //   button2Text: 'Anther Button',
        //   // buttonOnPress: 'cray',
        //   // setOnlyAlertOnce: true,
        //   color: '#000000',
        //   progress: {
        //     max: 100,
        //     curr: 50,
        //   },
      });
    }
  };

  const pauseTask = () => {
    ReactNativeForegroundService.stopAll();
  };
  const stopTask = () => {
    setTime(0);
    ReactNativeForegroundService.stopAll();
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24}}> {secondToHMS(time, 'HMS')}</Text>
      <View style={styles.space} />
      <View style={styles.buttonsContainer}>
        <Button title="Start" onPress={startTask} />
        <View style={styles.space} />
        <Button title="Pause" onPress={pauseTask} />
        <View style={styles.space} />
        <Button title="Stop" onPress={stopTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  space: {
    flex: 0.1,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
});
