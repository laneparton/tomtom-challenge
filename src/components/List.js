import React from "react"
import BusinessListing from "./BusinessListing"

const DonorList = ({ donors }) => {
  return (
    <div
      style={{
        marginBottom: 60,
      }}
    >
      {donors &&
        donors.map(donor => {
          console.log(donor)
          return <BusinessListing donor={donor} />
        })}
    </div>
  )
}

export default DonorList
