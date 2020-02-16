import React from "react"
import Layout from "../components/Common/Layout"
import SEO from "../components/Common/SEO"
import DonorMap from "../components/Map"
import DonorList from "../components/List"

import "../styles/browse.scss"

const BrowseDonors = ({ location, data }) => {
  const userLocation = [37.790638699999995, -122.390079]
  //latitude: 37.790638699999995
  //longitude: -122.390079
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
