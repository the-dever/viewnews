import classes from "./Contact.module.css";

const Contact = () => {
  return (
    <section className={classes.contact}>
      <div>
        <h2>GET IN TOUCH</h2>
      </div>
      <div>
        <h3>Use The Form Below To Drop US An E-Mail.</h3>
        <form className={classes["contact-form"]}>
          <div className={classes.first}>
            <label htmlFor="first-name">First Name</label>
            <input type="text" required id="first-name" placeholder="Name" />
          </div>
          <div className={classes.last}>
            <label htmlFor="last-name">Last Name</label>
            <input type="text" required id="last-name" placeholder="Name" />
          </div>
          <div className={classes.email}>
            <label htmlFor="email">Email</label>
            <input type="email" required id="email" placeholder="abc@def.com" />
          </div>
          <div className={classes.phone}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              required
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="XXX-XXX-XXXX"
            />
          </div>
          <div className={classes.message}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              required
              className={classes["form-textarea"]}
            ></textarea>
          </div>
          <div className={classes.action}>
            <button>Submit</button>
          </div>
        </form>
      </div>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1579532536935-619928decd08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
          alt=""
        />
        <figcaption>After you fill out our form, we will reach out.</figcaption>
      </figure>
    </section>
  );
};

export default Contact;
