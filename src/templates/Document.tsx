import React from "react";
import ReactMarkdown from "react-markdown";
import Layout from "../components/Layout";
import remarkGfm from "remark-gfm";
import { Box } from "@chakra-ui/react";
import { chakra } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

type DocumentProps = {
  pageContext: {
    data: {
      childMarkdownRemark: {
        rawMarkdownBody: string
      }
    }
  }
}

const Document: React.FC<DocumentProps> = ({ pageContext }) => {
  const { data } = pageContext;

  return (
    <Layout>
      <Box px={12} pt={12} maxW="900px">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={data.childMarkdownRemark.rawMarkdownBody}
          remarkPlugins={[remarkGfm]}
        />
      </Box>
    </Layout>
  );
};

export default Document;
