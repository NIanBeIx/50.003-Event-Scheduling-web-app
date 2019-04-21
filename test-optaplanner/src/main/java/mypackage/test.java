package mypackage;

import static java.nio.charset.StandardCharsets.UTF_8;

import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

public class test {
	public static void main(String[] args) {
		Storage storage = StorageOptions.getDefaultInstance().getService();
		BlobId blobId = BlobId.of("escproject", "blob_name");
		BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("text/plain").build();
		Blob blob = storage.create(blobInfo, "Hello, Cloud Storage!".getBytes(UTF_8));
	}
}
