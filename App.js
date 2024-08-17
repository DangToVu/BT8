
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/redux/store';
import { loadUser } from './src/redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainApp from './src/MainApp';

const LoadUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        dispatch(loadUser(JSON.parse(userData)));
      }
    };
    loadUserData();
  }, [dispatch]);

  return null;
};

const App = () => (
  <Provider store={store}>
    <LoadUser />
    <MainApp />
  </Provider>
);

export default App;
