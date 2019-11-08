const path = require("path")

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions
    const memoryTemplate = path.resolve('./src/templates/memory.js')
    return getMemoryNames(graphql).then(async memoryDirNames => {
        await Promise.all(memoryDirNames.map(async memoryDirName => {
            const { markdown, images } = await getFilesForMemory(memoryDirName, graphql)
            const slugOverride = getSlugOverride(markdown.node)
            createPage({
                path: `/memory/${slugOverride || memoryDirName}`,
                component: memoryTemplate,
                context: {
                    memoryDirName,
                    markdown,
                    images,
                },
            })
        }))
    })
}

const getMemoryNames = async graphql => {
    const gqlResult = await graphql(`
    {
        allDirectory(filter: {relativeDirectory: {eq: ""}}) {
            edges {
                node {
                    name
                }
            }
        }
    }`)
    return gqlResult.data.allDirectory.edges.map(({ node }) => node.name)
}

const getFilesForMemory = async (memoryDirName, graphql) => {
    const gqlResult = await graphql(`
    query {
        allFile(filter: {relativeDirectory: {regex: "/^${memoryDirName}/"}}) {
            edges {
                node {
                    childMarkdownRemark {
                        htmlAst
                        frontmatter {
                            slug
                        }
                    }
                    childImageSharp {
                        fluid {
                            base64
                            aspectRatio
                            src
                            srcSet
                            sizes
                        }
                    }
                    name
                    extension
                    relativeDirectory
                }
            }
        }
    }`)
    const edges = gqlResult.data.allFile.edges
    const markdown = edges.filter(({ node }) => node.extension === "md")[0]
    const images = edges.filter(({ node }) => node.relativeDirectory === `${memoryDirName}/images`)
    return { markdown, images }
}

const getSlugOverride = (markdownNode) => {
    if (!markdownNode.childMarkdownRemark) {
        return null
    }
    if (!markdownNode.childMarkdownRemark.frontmatter) {
        return null
    }
    return markdownNode.childMarkdownRemark.frontmatter.slug
}
