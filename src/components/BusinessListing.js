import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Meal from "./Meal"

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
})

const BusinessListing = ({ donor }) => {
  const classes = useStyles()

  let description = donor.description
  let name = donor.name

  const [offerData, setOfferData] = useState(null)

  useEffect(() => {
    // get data from GitHub api
    fetch(
      `https://cors-anywhere.herokuapp.com/http://yente.xyz/api/offers/` +
        donor.id
    )
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData)
        setOfferData(resultData)
      }) // set data for the number of stars
  }, [])

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {description}
        </Typography>

        <div className="horizontal-scroll">
          {offerData &&
            offerData.map(offer => {
              return <Meal data={offer} />
            })}
        </div>
      </CardContent>
    </Card>
  )
}

export default BusinessListing
