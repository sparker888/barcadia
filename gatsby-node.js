const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query {
      products: allContentfulProducts {
        edges {
          node {
            slug
          }
        }
      }
      posts: allContentfulPosts {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  data.products.edges.forEach(({ node }) => {
    createPage({
      path: `products/${node.slug}`,
      component: path.resolve("src/templates/product-template.js"),
      context: {
        slug: node.slug,
      },
    })
  })
  data.posts.edges.forEach(({ node }) => {
    createPage({
      path: `blog/${node.slug}`,
      component: path.resolve("src/templates/blog-template.js"),
      context: {
        slug: node.slug,
      },
    })
  })
}