module.exports = {
  async rewrites() {
    return [
      {
        source: "/quiz/:path*",
        destination: "http://localhost:3080/quiz/:path*",
      },
    ];
  },
};
