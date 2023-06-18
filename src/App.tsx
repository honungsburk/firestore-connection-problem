import React from 'react';
import { doc, getDoc, FirestoreError } from 'firebase/firestore';
import * as Firebase from './Firebase';

export default function App() {
  const { group, loading, error } = useDoc('group1');

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return <h1>Success!</h1>;
}

/**
 * Load a group from firestore
 */
export const useDoc = (id: string) => {
  const [group, setGroup] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<FirestoreError | null>(null);

  React.useEffect(() => {
    const loadGroup = async () => {
      setLoading(true);
      setError(null);

      try {
        const groupDoc = await doc(Firebase.firestore, 'group', id);
        const groupSnap = await getDoc(groupDoc);

        if (groupSnap.exists()) {
          setGroup(groupSnap.data());
        }
      } catch (err) {
        if (err instanceof FirestoreError) {
          setError(err);
        } else {
          throw err;
        }
      } finally {
        setLoading(false);
      }
    };

    loadGroup();
  }, [id]);

  return { group, loading, error };
};
