import React from "react"

const Meal = ({ data }) => {
  console.log(data)
  let img = data.img
  let name = data.name

  return (
    <div className="meal">
      <img
        src={"/images/" + img}
        style={{
          height: 100,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <p className="title">{name}</p>
    </div>
  )
}

export default Meal
