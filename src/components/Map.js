import React from "react"
import { Helmet } from "react-helmet"

class DonorMap extends React.Component {
  constructor(props) {
    super(props)
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
        zoom: 12,
      })
      var marker = new window.tt.Marker()
        .setLngLat([-122.393201, 37.790766])
        .addTo(map)
      var marker2 = new window.tt.Marker()
        .setLngLat([-122.419141, 37.783104])
        .addTo(map)
      var marker3 = new window.tt.Marker()
        .setLngLat([-122.394401, 37.795034])
        .addTo(map)
      var marker4 = new window.tt.Marker()
        .setLngLat([-122.398612, 37.800058])
        .addTo(map)
      var marker5 = new window.tt.Marker()
        .setLngLat([-122.396967, 37.787054])
        .addTo(map)
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
