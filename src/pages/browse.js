import React from "react"
import Layout from "../components/Common/Layout"
import SEO from "../components/Common/SEO"
import DonorMap from "../components/Map"
import DonorList from "../components/List"

import "../styles/browse.scss"

const BrowseDonors = ({ location, data }) => {
  console.log(location.state)
  const userLocation = [location.state.latitude, location.state.longitude]

  return (
    <Layout>
      <SEO title="Local Donors" />
      <DonorMap location={userLocation} query={data.allFakeOffersJson} />
      <DonorList query={data.allFakeOffersJson} />
    </Layout>
  )
}

export default BrowseDonors

export const Query = graphql`
  query testOffers {
    allFakeOffersJson {
      nodes {
        businessId
        name
        description
        address
        offers {
          food
          quantity
        }
      }
    }
  }
`
