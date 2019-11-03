exports.createPages = async ({ actions: { createPage }, graphql }) => {
    getMemoryNames(graphql).forEach(async memoryName => {
        const { md, img } = await getFilesForMemory(memoryName, graphql)  // TODO: parellelise :)
        createPage({
            path: `/memory/${memoryName}`,
            component: require.resolve('./src/templates/memory'),
            context: {
                a: 5,
            },
        })
    })
}

const getMemoryNames = async graphql => {
    const gqlResult = await graphql`
    {
        allDirectory(filter: {relativeDirectory: {eq: ""}}) {
            nodes {
                name
            }
        }
    }`
    return gqlResult.data.allDirectory.nodes.map(node => node.name)
}

const getFilesForMemory = async (memoryName, graphql) => {
    gqlResult = await graphql`
    {
        allFile(filter: {relativeDirectory: {regex: "/^memories\/${memoryName}/"}}) {
          nodes {
                relativeDirectory
                relativePath
                name
                extension
            }
        }
    }`
    const nodes = gqlResult.data.allFile.nodes
    const md = nodes.filter(node => node.extention === "md")
    const img = nodes.filter(node => node.relativeDirectory === `memories/${memoryName}/images`)
    return { md, img }
}
