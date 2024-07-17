module.exports = {
  apps: [
    {
      name: "omahucok",
      script: "./bin/www",
      env: {
        NODE_ENV: "production",
        PORT: 80,
        DATABASE_URL: "postgres://postgres.kmpyhaszylvjcpiyecuc:FAR3V0DPU935dPDP@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres",
        JWT_SECRET: "gryta",
        GOOGLE_CLIENT_ID: "",
        CLIENTID: "245752192947-jm7pa5r793ofr37k1ok167lov4hem6or.apps.googleusercontent.com",
        CLOUDINARY_CLOUD_NAME: dx8mr2esf,
        CLOUDINARY_API_KEY: 739567719816287,
        CLOUDINARY_API_SECRET: aPOQ5CulooqQCJYYyQQQ1B53RNM,
      },
    },
  ],
};

//JANGAN DI PUSH / DI MASUKIN AWS
