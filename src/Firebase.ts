import * as firebase from 'firebase/app';
import {
  connectFirestoreEmulator,
  initializeFirestore,
} from 'firebase/firestore';

const app =
  firebase.getApps().length === 0
    ? firebase.initializeApp({ projectId: 'fakeapp' })
    : firebase.getApps()[0];

// export const firestore = getFirestore(app);
export const firestore = initializeFirestore(app, {
  // experimentalForceLongPolling: true,
  // experimentalAutoDetectLongPolling: true,
});

firebase.setLogLevel('debug');

if (import.meta.env.MODE === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
