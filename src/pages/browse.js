import React, { useEffect, useState } from "react"
import Layout from "../components/Common/Layout"
import SEO from "../components/Common/SEO"
import DonorMap from "../components/Map"
import DonorList from "../components/List"
import SearchBar from "../components/SearchBar"

import "../styles/browse.scss"

const BrowseDonors = () => {
  const userLocation = [37.790638699999995, -122.390079]
  const [donorData, setDonorData] = useState(null)
  //latitude: 37.790638699999995
  //longitude: -122.390079
  useEffect(() => {
    // get data from GitHub api
    fetch(`https://cors-anywhere.herokuapp.com/http://yente.xyz/api/donors/`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData)
        setDonorData(resultData)
      }) // set data for the number of stars
  }, [])
  return (
    <Layout>
      <SEO title="Local Donors" />
      <SearchBar isBrowse />
      <DonorMap location={userLocation} donors={donorData} />
      <DonorList donors={donorData} />
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
