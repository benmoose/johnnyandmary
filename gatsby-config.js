module.exports = {
    siteMetadata: {
        title: `Johnny and Mary`,
        description: `Cheeky lil site for us`,
        author: `@benmoose`,
    },
    plugins: [
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "memories",
                path: `${__dirname}/data/memories/`,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        "gatsby-transformer-json",
    ],
}
