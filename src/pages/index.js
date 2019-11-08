import React from "react"
import {graphql, Link} from "gatsby"

export const query = graphql`
    query {
        allDirectory(
        filter: {
            relativeDirectory: { eq: "" }
        }) {
            edges {
                node {
                    base
                }
            }
        }
    }
`

const IndexPage = ({ data }) => {
    const { allDirectory } = data
    return (
        <>
            <h1>Johnny and Mary</h1>
            <ul>
                {
                    allDirectory.edges.map(({ node }) => <li key={node.base}><Link to={`/memory/${node.base}`}>{node.base}</Link></li>)
                }
            </ul>
        </>
    )
}

export default IndexPage
