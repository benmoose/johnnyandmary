import React from 'react'

import { Link } from 'gatsby'
import Image from 'gatsby-image'

export default ({ pageContext }) => {
    const { memoryName, images, markdown } = pageContext
    const paragraphs = markdown.node.childMarkdownRemark.htmlAst.children
        .filter(child => child.type === "element")

    return (
        <div>
            <h1>{memoryName}</h1>
            <Link to="/">Home</Link>

            <div style={{width: "256px"}}>
                {
                    images.map(({ node }) => {
                        console.log(node)
                        return <Image key={node.name} width="256px" fluid={node.childImageSharp.fluid} alt={node.name} />})
                }
            </div>
        </div>
    )
}
