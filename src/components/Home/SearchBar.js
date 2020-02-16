import React, { useState } from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import InputBase from "@material-ui/core/InputBase"
import IconButton from "@material-ui/core/IconButton"
import SearchIcon from "@material-ui/icons/Search"
import { usePosition } from "use-position"

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

export default function SearchBar() {
  const classes = useStyles()
  const [searchString, setSearchString] = useState(null)
  const { latitude, longitude } = usePosition(true, {
    enableHighAccuracy: true,
  })
  return (
    <Paper
      component="form"
      className={classes.root}
      onSubmit={event => {
        event.preventDefault()
        navigate("/browse/", {
          state: { searchString, latitude, longitude },
        })
      }}
    >
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Local Donations"
        inputProps={{ "aria-label": "search offers" }}
        onChange={event => setSearchString(event.target.value)}
      />
    </Paper>
  )
}
