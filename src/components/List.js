import React from "react"
import BusinessListing from "./BusinessListing"

const DonorList = ({ query }) => {
  return (
    <div>
      {query.nodes.map(business => {
        return <BusinessListing data={business} />
      })}
    </div>
  )
}

export default DonorList
