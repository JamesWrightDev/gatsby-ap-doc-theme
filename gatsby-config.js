module.exports = {
  plugins: [
    {
      resolve: "@chakra-ui/gatsby-plugin",
    },
    "gatsby-plugin-use-query-params",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: "data",
        name: `markdown-pages`,
        type: "Event",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
    },
  ],
};
