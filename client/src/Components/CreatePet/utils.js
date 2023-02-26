import { storage } from "../../firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export function formatDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

// Example usage:
const today = new Date();
const formattedDate = formatDate(today);
console.log(formattedDate); // Output: "2023/02/25"

export const uploadImage = async (imageURI, setUploading) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imageURI, true);
    xhr.send(null);
  });

  const reference = ref(storage, `Pictures/${Date.now()}-${imageURI}`);
  setUploading(true);

  return uploadBytes(reference, blob)
    .then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => {
        blob.close();
        return url;
      });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      setUploading(false);
    });
};
