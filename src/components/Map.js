import React from "react"
import { Helmet } from "react-helmet"

function addMarker() {
  var marker = new window.tt.Marker()
    .setLngLat([-122.393201, 37.790766])
    .addTo(map)
}

class DonorMap extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  componentDidMount() {
    const { location, query } = this.props
    const script = document.createElement("script")
    script.src = "/sdk/maps-web.min.js"
    document.body.appendChild(script)
    script.async = true
    script.onload = function() {
      var map = window.tt.map({
        key: "aUKG69E79YQTXzoYXtdCmrH9dhQ79pTf",
        container: "map",
        style: "tomtom://vector/1/basic-main",
        center: [location[1], location[0]],
        zoom: 15,
      })
      for (let i = 0; i < query.nodes.length; i++) {
        // addMarker()
      }
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <link rel="stylesheet" type="text/css" href="/sdk/maps.css" />
        </Helmet>
        <div id="map"></div>
      </div>
    )
  }
}
export default DonorMap
