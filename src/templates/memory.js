import React from 'react'

import { graphql } from 'gatsby'
import Image from 'gatsby-image'

export const query = graphql`
    query($slug: String!) {
        dataJson(slug: { eq: $slug }) {
            content
            image
        }
    }
`

export default MemoryTemplate = ({ a }) => {
    // const { a } = data

    return (
        <div>
            <pre>a = {a}</pre>
            {/* <Image fluid={image.childImageSharp.fluid} alt="alt text" /> */}
        </div>
    )
}
