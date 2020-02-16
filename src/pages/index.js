import React from "react"

import Layout from "../components/Common/Layout"
import SEO from "../components/Common/SEO"

import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Hero from "../components/Home/Hero"
import SearchBar from "../components/Home/SearchBar"

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
        <Grid item xs={12}>
          <div className="home-available">
            <h4>Meals Available Now</h4>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="home-available">
            <h4>Recently Viewed</h4>
          </div>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
