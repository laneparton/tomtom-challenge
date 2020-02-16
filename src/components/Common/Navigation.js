import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import SearchIcon from "@material-ui/icons/Search"
import FavoriteIcon from "@material-ui/icons/Favorite"
import LocationOnIcon from "@material-ui/icons/LocationOn"

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0,
  },
})

export default function Navigation() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}
