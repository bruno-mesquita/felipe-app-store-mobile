import Reactotron from 'reactotron-react-native';

const tron = Reactotron.configure({ name: 'Flipp-parthers' }).useReactNative().connect();

tron.clear();

console.tron = tron;
