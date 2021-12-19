import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Text } from '@chakra-ui/react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

type AllDocsRes = {
    allFile: {
        edges: {
            node: {
                base: string,
                relativeDirectory: string,
            }
        }[]
        distinct: string[]
    }
}

type DocFolder = {
    collection: string,
    files: [{ body: string }]
    children?: DocFolders
}

type DocFolders = DocFolder[]

const SidePanel: React.FC<{}> = () => {
    const { allFile } = useStaticQuery<AllDocsRes>(graphql`
    query AllDocs {
        allFile(filter: {internal: { mediaType: { eq: "text/markdown" } }relativeDirectory: { ne: "" }}) 
        {
        distinct(field: relativeDirectory)
        edges {
            node {
                base
                relativeDirectory
                id
                    childMarkdownRemark {
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    }
  `)

    return (
        <Box p={4} position="fixed" top="0" left="0" overflow-y="auto" w="280px" bg="black" h="100vh">

            <Accordion allowToggle allowMultiple>
                {
                    allFile.distinct.map(section => {
                        return (
                            <AccordionItem border="none" my={30}>
                                <AccordionButton outline="none">
                                    <Box flex='1' textAlign='left'>
                                        <Heading color="white" fontSize="14px" textTransform="uppercase">
                                            {section}
                                        </Heading>
                                    </Box>
                                    <AccordionIcon color="white" />
                                </AccordionButton>


                                <AccordionPanel ml={4} pb={4}>
                                    {
                                        allFile.edges.filter(item => item.node.relativeDirectory === section).map(item => {
                                            return <Text size="14px" color="white">
                                                <Link to={`/${section}/${item.node.base}`}>
                                                    {item.node.base}
                                                </Link>
                                            </Text>
                                        })
                                    }
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })
                }
            </Accordion>
        </Box >
    )
}

export default SidePanel;