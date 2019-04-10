package mypackage;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;

final public class FirebaseClients {
	final static String PRIVATEKEY = "login-6ce71-204e87d3b664.json";
	public static Firestore initFirebase() throws ClassNotFoundException, FileNotFoundException, IOException{
		InputStream serviceAccount = FirebaseClients.class
                .getClassLoader().getResourceAsStream(PRIVATEKEY);
		GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
		FirebaseOptions options = new FirebaseOptions.Builder()
			    .setCredentials(credentials)
			    .build();
		FirebaseApp.initializeApp(options);

		Firestore db = FirestoreClient.getFirestore();
		return db;
	}
}
