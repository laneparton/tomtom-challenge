import React, { useState, useEffect } from "react"

import Layout from "../components/Common/Layout"
import SEO from "../components/Common/SEO"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Hero from "../components/Home/Hero"
import SearchBar from "../components/SearchBar"
import Meal from "../components/Meal"

import "../styles/home.scss"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const IndexPage = () => {
  const classes = useStyles()
  const [offerData, setOfferData] = useState(null)

  useEffect(() => {
    // get data from GitHub api
    fetch(`https://cors-anywhere.herokuapp.com/http://yente.xyz/api/offers/`)
      .then(response => response.json()) // parse JSON from request
      .then(resultData => {
        console.log(resultData)
        setOfferData(resultData)
      }) // set data for the number of stars
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Grid container justify="center">
        <Grid item xs={12}>
          <Hero />
        </Grid>
        <Grid item xs={10}>
          <div className="home-search">
            <SearchBar />
          </div>
        </Grid>
        <Grid item xs={11}>
          <div className="home-available">
            <h4>Meals Available Now</h4>
            <div className="horizontal-scroll">
              {offerData &&
                offerData.map(offer => {
                  return <Meal data={offer} />
                })}
            </div>
          </div>
        </Grid>
        <Grid item xs={11}>
          <div className="recently-viewed">
            <h4>Recently Viewed</h4>
            <div className="horizontal-scroll">
              {offerData &&
                offerData.map(offer => {
                  return <Meal data={offer} />
                })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
