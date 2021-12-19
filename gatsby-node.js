const fs = require("fs");
const { relative } = require("path");

// Make sure the data directory exists
exports.onPreBootstrap = async (config) => {
  const contentPath = "data";

  if (!fs.existsSync(contentPath)) {
    config.reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    {
      allFile(
        filter: {
          internal: { mediaType: { eq: "text/markdown" } }
          relativeDirectory: { ne: "" }
        }
      ) {
        edges {
          node {
            base
            relativeDirectory
            id
            childMarkdownRemark {
              rawMarkdownBody
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("error loading events", result.errors);
    return;
  }
  const docs = result.data.allFile.edges;

  docs.forEach((doc) => {
    const slug = `${doc.node.relativeDirectory}/${doc.node.base}`;
    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/Document.tsx"),
      context: {
        data: doc.node,
      },
    });
  });
};
