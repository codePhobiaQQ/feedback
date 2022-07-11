module.exports = {
  image: {
    domains: ["http://localhost:1337/"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://drive.google.com/*"
      }
    ];
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader"
      }
    });
    return config;
  }

  // reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'https://localhost:5000/:path*',
  //     },
  //   ]
  // },
};
