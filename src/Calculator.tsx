import { ReactNode, useEffect, useState } from "react";
import "./Calculator.css";

const ELECTRICITY_UNIT_PRICE = 6.5; // in rupees
const RESERVATION_FEE_PER_KWH = 165; // per unit in rupees
const CO2_SAVED_PER_KWH = 0.8; // per unit in kg
const NUM_TREES_PLANTED_PER_KG_CO2 = 0.0016; //number of trees

const Calculator = () => {
  const [billoffsetValue, setBillOffsetvalue] = useState("20");
  const [billAmount, setBillAmount] = useState("");

  const [data, setData] = useState({
    annualsavings: "0",
    fifteenYrSavings: "0",
    carbonSaved: "0",
    treesAdded: "0",
    reservationFees: "0",
  });

  const formatToDisplay = (value: number) => {
    const formattedNumber = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

    return formattedNumber;
  };

  const calculateDummy = () => {
    if (billAmount.trim() === "") {
      return;
    }

    const monthlyBillAmount = +billAmount;
    const offsetInNumber = +billoffsetValue / 100;

    const electricityConsumption = monthlyBillAmount / ELECTRICITY_UNIT_PRICE;

    const annualsavings = monthlyBillAmount * offsetInNumber * 12;

    const carbonSaved =
      CO2_SAVED_PER_KWH * electricityConsumption * offsetInNumber * 12 * 15;

    setData({
      annualsavings: `₹ ${formatToDisplay(annualsavings)}`,
      fifteenYrSavings: `₹ ${formatToDisplay(annualsavings * 15)}`,
      carbonSaved: `${formatToDisplay(carbonSaved)} kgs`,
      treesAdded: `${Math.floor(
        +formatToDisplay(carbonSaved * NUM_TREES_PLANTED_PER_KG_CO2)
      )}`,
      reservationFees: `₹ ${formatToDisplay(
        electricityConsumption * RESERVATION_FEE_PER_KWH * offsetInNumber
      )}`,
    });
  };

  useEffect(() => {
    calculateDummy();
  }, [billoffsetValue, billAmount]);

  return (
    <div className="container">
      <input
        value={billAmount}
        onChange={(e) => {
          setBillAmount(e.target.value);
        }}
        className="amountContainer"
        placeholder="Enter average electricity bill amount ₹"
      />

      <div className="sliderContainer">
        <div className="sliderText">
          <p>Choose your bill offset percentage</p>

          <p>{billoffsetValue}%</p>
        </div>

        <input
          type="range"
          onChange={(e) => {
            setBillOffsetvalue(e.target.value);
          }}
          min="10"
          max="100"
          value={billoffsetValue}
          className="slider"
          id="myRange"
        />
      </div>

      <div className="dataContainer">
        <ItemContainer
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.4998C13.1421 16.4998 16.5 13.1419 16.5 8.99975C16.5 4.85762 13.1421 1.49976 9 1.49976C4.85786 1.49976 1.5 4.85762 1.5 8.99975C1.5 13.1419 4.85786 16.4998 9 16.4998Z"
                stroke="#212121"
                stroke-width="1.33375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 5.24976H11.5M6.5 7.56476H11.5M10.0417 13.5831L6.5 9.87976H7.75C10.5283 9.87976 10.5283 5.24976 7.75 5.24976"
                stroke="#212121"
                stroke-width="1.33375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title="Annual Savings"
          amount={data.annualsavings}
        />
        <ItemContainer
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.4998C13.1421 16.4998 16.5 13.1419 16.5 8.99975C16.5 4.85762 13.1421 1.49976 9 1.49976C4.85786 1.49976 1.5 4.85762 1.5 8.99975C1.5 13.1419 4.85786 16.4998 9 16.4998Z"
                stroke="#212121"
                stroke-width="1.33375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.5 5.24976H11.5M6.5 7.56476H11.5M10.0417 13.5831L6.5 9.87976H7.75C10.5283 9.87976 10.5283 5.24976 7.75 5.24976"
                stroke="#212121"
                stroke-width="1.33375"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title="15 Years Savings"
          amount={data.fifteenYrSavings}
        />
        <ItemContainer
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.23807 15.8333C3.26557 15.8333 1.66641 14.2533 1.66641 12.3042C1.66641 10.3542 3.26557 8.77417 5.23807 8.77417C5.47474 8.77417 5.70641 8.7975 5.92974 8.84083M5.92974 8.84083C5.734 8.31798 5.63407 7.76413 5.63474 7.20583C5.63474 4.60667 7.76641 2.5 10.3964 2.5C12.8464 2.5 14.8639 4.32833 15.1297 6.67917M5.92974 8.84083C6.39082 8.93038 6.82974 9.10991 7.22141 9.36917M11.9839 6.68917C12.4943 6.51134 13.031 6.42091 13.5714 6.42167C14.1164 6.42167 14.6406 6.5125 15.1297 6.67917M15.1297 6.67917C16.9931 7.31667 18.3331 9.0675 18.3331 11.1275C18.3331 13.3833 16.7272 15.2692 14.5831 15.7275M11.6664 15.8333H9.99974M9.99974 15.8333H8.33307M9.99974 15.8333V14.1667M9.99974 15.8333V17.5"
                stroke="#212121"
                stroke-width="1.25"
                stroke-linecap="round"
              />
            </svg>
          }
          title="CO2 Saved"
          amount={data.carbonSaved}
        />
        <ItemContainer
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 15C16.6292 15 17.4308 6.525 17.495 2.4975C17.4956 2.38794 17.4742 2.27938 17.4321 2.17824C17.39 2.0771 17.328 1.98543 17.2498 1.90867C17.1717 1.8319 17.0789 1.77159 16.977 1.73131C16.8751 1.69103 16.7662 1.6716 16.6567 1.67417C2.5 1.93417 2.5 8.7975 2.5 15V18.3333"
                stroke="#212121"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.5 15.0001C2.5 15.0001 2.5 10.0001 9.16667 9.1668"
                stroke="#212121"
                stroke-width="1.66667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
          title="Trees Added"
          amount={data.treesAdded}
        />
        <ItemContainer
          icon={
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9375 3.75H4.0625C2.85438 3.75 1.875 4.72938 1.875 5.9375V14.0625C1.875 15.2706 2.85438 16.25 4.0625 16.25H15.9375C17.1456 16.25 18.125 15.2706 18.125 14.0625V5.9375C18.125 4.72938 17.1456 3.75 15.9375 3.75Z"
                stroke="#212121"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.875 7.5H18.125M5 11.7188H6.875V12.5H5V11.7188Z"
                stroke="#212121"
                stroke-width="2.34375"
                stroke-linejoin="round"
              />
            </svg>
          }
          title="One Time Reservation Fees"
          amount={data.reservationFees}
        />
      </div>
    </div>
  );
};

export default Calculator;

interface ElementProps {
  icon: ReactNode;
  title: string;
  amount: string;
}

const ItemContainer = ({ icon, title, amount }: ElementProps) => {
  return (
    <div className="itemContainer">
      <div className="titleContainer">
        {icon}

        {title}
      </div>

      <p className="amount">{amount}</p>
    </div>
  );
};
