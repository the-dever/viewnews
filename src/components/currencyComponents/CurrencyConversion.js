import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Loader from "../../UI/Loader";
import { arrowRight, arrowSwitch } from "../../UI/svgs/icons";

import classes from "./CurrencyConversion.module.css";

const containerVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const contentVairants = {
  hidden: {
    scale: 0,
    // width: 0,
  },
  visible: {
    scale: 1,
    // width: "100%",
    transition: { type: "spring", stiffness: 100 },
  },
};

const CurrencyConversion = (props) => {
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [convertedValue, setConvertedValue] = useState();
  const [switched, setSwitched] = useState(null);
  const [values, setValues] = useState({ from: "", to: "" });

  const fromInputRef = useRef();
  const toInputRef = useRef();
  const amountInputRef = useRef();

  const convertHandler = async (e) => {
    e.preventDefault();
    setSwitched(false);
    let fromValue = fromInputRef.current.value;
    let toValue = toInputRef.current.value;
    const amount = amountInputRef.current.value;

    if (!fromValue && !toValue) {
      setError("Currencies must be provided");
      return;
    }

    if (fromValue === toValue) {
      setError("Currencies cannot be same");
      return;
    }

    if (!fromValue) {
      setError("What currency do you want to exchange from");
      return;
    }

    if (!toValue) {
      setError("What currency do you want to exchange to?");
      return;
    }

    if (!amount) {
      setError("Amount must be provided");
      return;
    }

    setError("");

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.exchangerate.host/convert?from=${fromValue}&to=${toValue}&amount=${amount}`
      );
      if (!response.ok)
        throw new Error("Failed to get Currency Data. Please try again!");
      const data = await response.json();
      setConvertedValue(data.result);
    } catch (err) {
      console.error(err.mesage);
      setErrorMessage("Failed to get Currency Data. Please try again!");
    }
    setIsLoading(false);
  };

  const switchHandler = (e) => {
    amountInputRef.current.value = "";
    setConvertedValue("");
    e.preventDefault();
    setValues({
      from: fromInputRef.current.value,
      to: toInputRef.current.value,
    });
    setSwitched(true);
  };

  if (switched && (values.from || values.to)) {
    fromInputRef.current.value = values.to;
    toInputRef.current.value = values.from;
  }

  return (
    <motion.div
      className={classes["conversion-container"]}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {isLoading && <Loader />}
      <motion.h3 variants={contentVairants}>
        {errorMessage
          ? errorMessage
          : "Want to do conversion using our calculator?"}
      </motion.h3>
      {!errorMessage && (
        <form variants={contentVairants}>
          {error && (
            <div className={classes["conversion-error-message"]}>
              <p>{error}</p>
            </div>
          )}

          <motion.div
            variants={contentVairants}
            className={classes["from-input"]}
          >
            <label htmlFor="from">From</label>
            <select id="from" onChange={() => setError("")} ref={fromInputRef}>
              <option></option>
              {props.currencyData.map((c, i) => (
                <option key={i}>{c.name}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            variants={contentVairants}
            className={classes["to-input"]}
          >
            <label htmlFor="to">To</label>
            <select id="to" onChange={() => setError("")} ref={toInputRef}>
              <option></option>
              {props.currencyData.map((c, i) => (
                <option key={i}>{c.name}</option>
              ))}
            </select>
          </motion.div>

          <motion.div
            variants={contentVairants}
            className={classes["num-input"]}
          >
            <label htmlFor="amount">Amount</label>
            <input
              required
              placeholder="0"
              type="number"
              id="amount"
              min="1"
              max="999999"
              ref={amountInputRef}
              onChange={() => setError("")}
            />
          </motion.div>

          <motion.div
            variants={contentVairants}
            className={classes["num-converted"]}
          >
            {convertedValue
              ? convertedValue.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })
              : ""}
          </motion.div>

          <div className={classes["conversion-action"]}>
            <motion.button
              type="submit"
              variants={contentVairants}
              className={classes["btn-convert"]}
              onClick={convertHandler}
            >
              CONVERT {arrowRight}
            </motion.button>
            <motion.button
              variants={contentVairants}
              className={classes["btn-switch"]}
              onClick={switchHandler}
            >
              SWITCH {arrowSwitch}
            </motion.button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default CurrencyConversion;
