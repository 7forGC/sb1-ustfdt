import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  where
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import type { Message } from '../types';

export const messageService = {
  async sendMessage(message: Omit<Message, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'messages'), {
      ...message,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  },

  async sendAudioMessage(senderId: string, audioBlob: Blob): Promise<string> {
    const fileRef = ref(storage, `audio/${senderId}/${Date.now()}.webm`);
    await uploadBytes(fileRef, audioBlob);
    const url = await getDownloadURL(fileRef);

    const docRef = await addDoc(collection(db, 'messages'), {
      senderId,
      type: 'audio',
      content: url,
      timestamp: serverTimestamp(),
      likes: []
    });

    return docRef.id;
  },

  subscribeToMessages(callback: (messages: Message[]) => void) {
    const q = query(
      collection(db, 'messages'),
      orderBy('timestamp', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];
      callback(messages);
    });
  },

  async toggleLike(messageId: string, userId: string): Promise<void> {
    const messageRef = doc(db, 'messages', messageId);
    const message = await getDocs(query(collection(db, 'messages'), where('likes', 'array-contains', userId)));
    const isLiked = !message.empty;

    await updateDoc(messageRef, {
      likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
    });
  }
};