const firebase = require("firebase/app");
const { getStorage } = require("firebase/storage");
// get config from Firebase console
const firebaseConfig = {
  type: "service_account",
  project_id: "beacon-backend-a8bf3",
  private_key_id: "a8de731f5081efe4cc2cc5908a68a6ae31605b16",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCaA1p3Ufa+tqdJ\nhg6jaBaYNMVBJPy2RZ7A9+29dlX2mB/yv3vnUhzyCvVJvCNO8QKcd9+97HHOOaMj\nMr+Eifzv7eICKA5zRokK0YP2DPcdW2YNQ8gpAme1BaXDwsUvYsWWs/oX3t4+iscV\nDLJFk+4x/VW5hGwrhVgQIPud/EaAGQcxJgktguaPatY5Eseu01FPnsoky7IdaPoE\nnIcLu67yp9LEpD140WJWjoZWWLK+FTSuIOJpqFmPWRa83o40I3dqRdf/K2sExmNW\n7ebT6LHZMckdF3qAy8EH5pPXMFR3YDBKJwYyiFqDFXBT8DX8IfiTY918yJvBz2Eg\nWNtouahxAgMBAAECggEABJMVUwMs1UAibebWdN7fNO9auiZs5ZKunKqzwnN+XPaE\nLgPaaUxUe15jjlu3n/bWp53qSzJ3tH/PxN7gA2hmo+j1h2NEzDW/Ik9UBrEeseq7\nq3WYJc4Ve7H92RFMjBP4X6z1QIcOvarSyPqskBaAKVBa0hZvcOEWdLwvqeMK/dXO\nP8vWg06MdTHE7JXAiNO17L1YXYbh6KdEeYmOK3Tqm/2ZU+NevPmPtTAxdO5fWUIK\na0L+U8M/UdCk0008z/ZN5Nk7YZv7UWuV7k3EU/FUaO0i3ks4RjpmfnPhsvZY9hSP\ncwu+MQDo7c6Do1E/AlXRYZLwikqRXjZcw3nxvyb6pQKBgQDVhrceybeQXxtC4UhI\nQ55OTeoUK9ozTfqyU1bub45O93trBB8S5CjvFDIQBClTmSauwEogslunlBjud9Kg\nQ2enrxA6t7flT3vZ7OIxPFRwVUdF4DzJ+UtpOE88BWL+7/g6d30bs3SPzqD60uqe\nDNAGzjioruElHkQlIh6+bkY9RwKBgQC4phT5SL9Y9Tt9x/XNRrhK78+oJ334mSVh\nLcGtGRNM+hFTHp3pzjG8umQ3JyaTghHIzWFYRqZ6+aam5WCAp4ueSgpemGodmoB2\nfbu4UCkvhGWHcS8mfRokg7ZcGd07ELAd2qkfPU7tnnXmVioVnAsmUrzuoDPxULNt\naPKKrCHohwKBgB/372q4oLcIxjgZKo1HMmhe2fDzL9QGlMYmHBnOseu4uc2n7E8T\nwd0plOU4+kb94wC+4VpL2dUZIzJw1iQQc3BzkWZ5Ixs97zkNckAU3D+FRQp9LBzB\nKj0ypQpDdDLfErcONLj1ATqWoRtsgJvxJyQds/XtWOAJzAITPa8dK375AoGALxR5\nqI356+6rOojvjWWIu+KladSX8/joZPzLsxz/pNLl8/GMhf7DA8Hqp31eAqJZcn+b\nYGyzKgvZiBhYILWXjcaHGlN2SxIHyy6H3Jjjx2/Ui1I6mW+waLsEljsqA1Nf9Fy6\nXnK9WyzaFt7FYDknRqA1+An09ISFG1J09RKqmqUCgYBW8WHtABEqe8QYyf4uCrCR\ndvZUaHvgPNVE3OQwlMvKhs1BcMVX0TnGcU2rGLS+Q/5whASYxYp0QTBOsni31qh/\n9MzDhAxxDlUw/S3LaiWGYSbxEqZtfeQAQFviG3rCLhRJOvoFICo8rnmMdmVxXe5O\n26fUD+wdzHTTm9hGlmaoXA==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-epv8u@beacon-backend-a8bf3.iam.gserviceaccount.com",
  client_id: "117691513012570764022",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-epv8u%40beacon-backend-a8bf3.iam.gserviceaccount.com",
  storageBucket: "gs://beacon-backend-a8bf3.appspot.com",
};
const firebaseinit = firebase.initializeApp(firebaseConfig);
FirebaseStorage = getStorage(firebaseinit);
module.exports = FirebaseStorage;
