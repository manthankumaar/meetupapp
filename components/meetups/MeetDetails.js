import classes from './MeetDetails.module.css'

const MeetDetails = ({ image, title, address, description }) => {
  return (
    <section className={classes.details}>
      <img src={image} alt='meetImage' />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  )
}

export default MeetDetails
